export default async function handler(req, res) {
  // Allow only your website
  res.setHeader("Access-Control-Allow-Origin", "https://www.theinvestorsloan.com");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const zapierResponse = await fetch("https://hooks.zapier.com/hooks/catch/XXXXXXX/abcdefg/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await zapierResponse.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong", details: error.message });
  }
}