const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/authMiddleware");
const {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale,
  getSalesStats
} = require("../controllers/salesController");

// All routes require authentication
router.use(verifyToken);

// Get all sales
router.get("/", getAllSales);

// Get sales statistics
router.get("/stats", getSalesStats);

// Get single sale
router.get("/:id", getSaleById);

// Create new sale
router.post("/", createSale);

// Update sale
router.put("/:id", updateSale);

// Delete sale
router.delete("/:id", deleteSale);

module.exports = router; 