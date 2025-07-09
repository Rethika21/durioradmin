const express = require("express");
const cors = require("cors");
const Sale = require("./models/Sale");
const verifyToken = require("./utils/authMiddleware");
require("dotenv").config();
console.log(" MONGO_URI:", process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
const salesRoutes = require("./routes/sales");

app.use("/api/admin", authRoutes);
app.use("/api/sales", salesRoutes);

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("🟢 MongoDB connected"))
.catch((err) => console.error("🔴 MongoDB connection error:",err));

app.listen(PORT, () => {
  console.log(`Node backend running on http://localhost:${PORT}`);
});
