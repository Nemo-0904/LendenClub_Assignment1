const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config(); // loads .env variables

const app = express();

// ✅ Allow frontend to talk to backend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Middleware to parse JSON request bodies
app.use(express.json());



// Routes (we will create this next)
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
