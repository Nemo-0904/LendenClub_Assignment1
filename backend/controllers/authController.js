const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { encrypt, decrypt } = require("../utils/cryptoUtil");

exports.register = (req, res) => {
  // Safety check
  if (!req.body) {
    return res.status(400).json({ message: "Request body missing" });
  }

  const { name, email, password, aadhaar } = req.body;

  // Validation
  if (!name || !email || !password || !aadhaar) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if user exists
  db.query(
    "SELECT id FROM users WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      if (result.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password and encrypt aadhaar
      const hashedPassword = bcrypt.hashSync(password, 10);
      const encryptedAadhaar = encrypt(aadhaar);

      // Insert user
      db.query(
        "INSERT INTO users (name, email, password_hash, aadhaar_encrypted) VALUES (?, ?, ?, ?)",
        [name, email, hashedPassword, encryptedAadhaar],
        (err) => {
          if (err) {
            return res.status(500).json({ message: "Database insert failed" });
          }

          res.status(201).json({
            message: "User registered successfully",
          });
        }
      );
    }
  );
};

/* =========================
   LOGIN CONTROLLER
========================= */
exports.login = (req, res) => {
  // IMPORTANT FIX
  if (!req.body) {
    return res.status(400).json({ message: "Request body missing" });
  }

  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      if (result.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = result[0];

      // Compare password
      const isMatch = bcrypt.compareSync(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate JWT
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        message: "Login successful",
        token,
      });
    }
  );
};

/* =========================
   PROFILE CONTROLLER
========================= */
exports.profile = (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  db.query(
    "SELECT id, name, email, aadhaar_encrypted FROM users WHERE id = ?",
    [userId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = result[0];

      // Decrypt Aadhaar
      user.aadhaar = decrypt(user.aadhaar_encrypted);
      delete user.aadhaar_encrypted;

      res.status(200).json(user);
    }
  );
};
