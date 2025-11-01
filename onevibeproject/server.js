import express from "express";
import cors from "cors"; // ✅ voeg deze regel toe

const app = express();
const port = process.env.PORT || 5173;

app.use(cors({
  origin: [
    "https://onevibeofficial.com",
    "https://www.onevibeofficial.com"
  ]
}));




// ✅ Alle 40 unieke hoodie QR-codes
const validCodes = {
  "OV-DROP1-06IG": "hoodie-drop1-white",
  "OV-DROP1-3QSA": "hoodie-drop1-white",
  "OV-DROP1-43EC": "hoodie-drop1-white",
  "OV-DROP1-4TJ1": "hoodie-drop1-white",
  "OV-DROP1-69K0": "hoodie-drop1-white",
  "OV-DROP1-6ELT": "hoodie-drop1-white",
  "OV-DROP1-6PT3": "hoodie-drop1-white",
  "OV-DROP1-763L": "hoodie-drop1-white",
  "OV-DROP1-7LAC": "hoodie-drop1-white",
  "OV-DROP1-7SAV": "hoodie-drop1-white",
  "OV-DROP1-7UKD": "hoodie-drop1-white",
  "OV-DROP1-8H8K": "hoodie-drop1-white",
  "OV-DROP1-94KZ": "hoodie-drop1-white",
  "OV-DROP1-C5NB": "hoodie-drop1-white",
  "OV-DROP1-CSCD": "hoodie-drop1-white",
  "OV-DROP1-DBSS": "hoodie-drop1-white",
  "OV-DROP1-DW1M": "hoodie-drop1-white",
  "OV-DROP1-ECO7": "hoodie-drop1-white",
  "OV-DROP1-EULG": "hoodie-drop1-white",
  "OV-DROP1-H8B9": "hoodie-drop1-white",
  "OV-DROP1-I0DC": "hoodie-drop1-white",
  "OV-DROP1-LO1B": "hoodie-drop1-white",
  "OV-DROP1-M8R4": "hoodie-drop1-white",
  "OV-DROP1-M8XS": "hoodie-drop1-white",
  "OV-DROP1-MTXJ": "hoodie-drop1-white",
  "OV-DROP1-NOYA": "hoodie-drop1-white",
  "OV-DROP1-OAMF": "hoodie-drop1-white",
  "OV-DROP1-OEMQ": "hoodie-drop1-white",
  "OV-DROP1-QJ7B": "hoodie-drop1-white",
  "OV-DROP1-RCAK": "hoodie-drop1-white",
  "OV-DROP1-S8TY": "hoodie-drop1-white",
  "OV-DROP1-T7WG": "hoodie-drop1-white",
  "OV-DROP1-T9K1": "hoodie-drop1-white",
  "OV-DROP1-TFOO": "hoodie-drop1-white",
  "OV-DROP1-TZCJ": "hoodie-drop1-white",
  "OV-DROP1-VU5U": "hoodie-drop1-white",
  "OV-DROP1-VV7O": "hoodie-drop1-white",
  "OV-DROP1-WFJ4": "hoodie-drop1-white",
  "OV-DROP1-X9MS": "hoodie-drop1-white",
  "OV-DROP1-XTRB": "hoodie-drop1-white",
};

// ✅ Verificatie endpoint
app.get("/verifyBadge", (req, res) => {
  const code = req.query.code?.trim().toUpperCase();

  if (!code) {
    return res.status(400).json({ valid: false, message: "Code ontbreekt" });
  }

  if (validCodes[code]) {
    return res.json({
      valid: true,
      hoodieVariant: validCodes[code],
      message: "✅ Code geldig – toegang verleend",
    });
  }

  res.status(404).json({ valid: false, message: "❌ Ongeldige code" });
});

