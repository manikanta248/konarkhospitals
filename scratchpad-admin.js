async function shoot(url, width, height, filename) {
  const targetsRes = await fetch("http://127.0.0.1:9222/json/new?" + url, { method: "PUT" });
  const target = await targetsRes.json();
  const WebSocket = require("ws");
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = ++id;
      pending.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }
  ws.on("message", (data) => {
    const msg = JSON.parse(data.toString());
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg.result);
      pending.delete(msg.id);
    }
  });
  await new Promise((resolve) => ws.on("open", resolve));
  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
  await new Promise((r) => setTimeout(r, 2000));
  const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
  require("fs").writeFileSync(
    `C:/Users/MANIKA~1/AppData/Local/Temp/claude/c--Users-Manikanta-Konark-Hospitals/0e54a985-9f21-463a-809d-5d81fafef083/scratchpad/${filename}`,
    Buffer.from(shot.data, "base64")
  );
  ws.close();
}
async function main() {
  await shoot("http://localhost:3001/admin/login", 1440, 900, "admin-login.png");
  process.exit(0);
}
main().catch((e) => { console.error(e); process.exit(1); });
