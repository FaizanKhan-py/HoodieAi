const admin = require("firebase-admin");
const User = require("../models/User");

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // verify Firebase JWT
    const decoded = await admin.auth().verifyIdToken(token);

    // decoded contains uid, email, name etc.
    const { uid, email, name } = decoded;

    // find or create user in MongoDB
    let user = await User.findOne({ uid });

    if (!user) {
      user = await User.create({
        uid,
        email,
        name: name || "User",
      });
    }

    req.user = user; // attach DB user
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid Firebase token" });
  }
};

module.exports = { protect };