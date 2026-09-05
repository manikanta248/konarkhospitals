import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

import { createCollectionRouter } from "./routes/collectionRoutes";
import appointmentsRouter from "./routes/appointments";
import contactRouter from "./routes/contact";
import dashboardRouter from "./routes/dashboard";
import chatRouter from "./routes/chat";
import { invalidateChatContextCache } from "./lib/chatContext";

dotenv.config();

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.WEB_ORIGIN?.split(",") ?? "http://localhost:3000",
  })
);
app.use(express.json());
app.use(morgan("dev"));

const formLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 });
// Chat gets its own, tighter limit than the general content GETs; booking-via-chat gets a
// second, stricter limit stacked on top, independent of general chat volume (see
// docs/CHATBOT_PLAN.md §3 "Abuse / cost control").
const chatLimiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 20, standardHeaders: true, legacyHeaders: false });
const chatBookingLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5, standardHeaders: true, legacyHeaders: false });

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/departments", createCollectionRouter("departments"));
app.use("/api/doctors", createCollectionRouter("doctors"));
app.use("/api/articles", createCollectionRouter("articles"));
app.use("/api/testimonials", createCollectionRouter("testimonials"));
app.use("/api/events", createCollectionRouter("events"));
app.use("/api/careers", createCollectionRouter("careers"));
app.use("/api/health-packages", createCollectionRouter("healthPackages"));

// A knowledge-base edit should be reflected in the bot's next reply immediately, not after
// the chat context's 5-minute cache happens to expire.
app.use("/api/chat-knowledge", (req, res, next) => {
  res.on("finish", () => {
    if (["POST", "PUT", "DELETE"].includes(req.method) && res.statusCode < 400) invalidateChatContextCache();
  });
  next();
});
app.use("/api/chat-knowledge", createCollectionRouter("chatKnowledge"));

app.use("/api/appointments", formLimiter, appointmentsRouter);
app.use("/api/contact", formLimiter, contactRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/chat/confirm-appointment", chatBookingLimiter);
app.use("/api/chat", chatLimiter, chatRouter);

app.use((_req, res) => res.status(404).json({ error: "Not found" }));

export default app;
