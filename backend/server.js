require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:5173" })); // 5173 is Vite's default port
app.use(express.json());

const PORT = process.env.PORT || 3001;

// ── K2 Setup ──────────────────────────────────────────
const K2 = require('k2-connect-node')({
  clientId: process.env.K2_CLIENT_ID,
  clientSecret: process.env.K2_CLIENT_SECRET,
  apiKey: process.env.K2_API_KEY,
  baseUrl: process.env.K2_BASE_URL,
})

const TokenService = K2.TokenService

// ── Token Endpoint ────────────────────────────────────
app.get("/api/token", async (req, res) => {
  try {
    const response = await TokenService.getToken();
    res.json({ success: true, token: response.access_token });
  } catch (err) {
    console.error("Token error:", err); // <-- this will print full error in terminal
    res.status(500).json({ success: false, error: err.message, details: err });
  }
});

const StkService = K2.StkService;

app.post("/api/stk", async (req, res) => {
  const { firstName, lastName, phoneNumber, amount } = req.body;

  try {
    const tokenResponse = await TokenService.getToken();
    const accessToken = tokenResponse.access_token;

const stkOptions = {
  tillNumber: process.env.K2_TILL_NUMBER,
  firstName:'Customer',
  lastName: 'Payment',
  phoneNumber,
  currency: "KES",
  amount: Number(amount),
  callbackUrl: "http://localhost:3001/api/stk/callback",
  paymentChannel: "M-PESA STK Push",
  accessToken,
};

    const location = await StkService.initiateIncomingPayment(stkOptions);
    res.json({ success: true, location });
  } catch (err) {
    console.error("STK error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/stk/callback", (req, res) => {
  console.log("Payment result:", JSON.stringify(req.body, null, 2));
  res.status(200).json({ message: "Received" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
