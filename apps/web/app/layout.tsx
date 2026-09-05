import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Konark Hospitals — Multispeciality Hospital in Hyderabad",
    template: "%s | Konark Hospitals",
  },
  description:
    "Konark Hospitals, Jeedimetla — best multispeciality hospital in Hyderabad offering fertility & IVF, cardiology, orthopaedics, gynecology and 24/7 emergency care.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
