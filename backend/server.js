require("dotenv").config();
const express   = require("express");
const cors      = require("cors");
const connectDB = require("./config/db");
const admin = require("firebase-admin");
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT 
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

// ── Connect Database ──────────────────────────────────────────
connectDB();

// ── Global Middleware ─────────────────────────────────────────
app.use(cors({
  origin: "https://hoodie-ai.vercel.app",
  credentials: true
}))
app.use(express.json());

// ── These are APIs for different entities ────────────────────────────────────────────────────
app.use("/api/user",    require("./routes/userRoutes"));
app.use("/api/image",   require("./routes/imageRoutes"));
app.use("/api/designs", require("./routes/designRoutes"));
app.use("/api/cart",    require("./routes/cartRoutes"));
app.use("/api/orders",  require("./routes/orderRoutes"));

// ── Health Check ──────────────────────────────────────────────
app.get("/", (req, res) => res.json({ message: "HoodieAI API running " }));

// ── Start Server ──────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
