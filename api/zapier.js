api/zapier.js
// api/zapier.js
export default async function handler(req, res) {
  // Allow CORS
  res.setHeader("Access-Control-Allow-Origin", "https://www.theinvestorsloan.com");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // quick response for preflight
  }

  try {
    const zapierUrl = process.env.ZAPIER_WEBHOOK_URL;

    if (!zapierUrl) {
      return res.status(500).json({
        success: false,
        error: "Zapier webhook not configured (env var ZAPIER_WEBHOOK_URL missing)",
      });
    }

    const zapierPayload = req.body;

    const zapierRes = await fetch(zapierUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(zapierPayload),
    });

    const text = await zapierRes.text();

    return res.status(200).json({ success: true, zapier_response: text });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}



