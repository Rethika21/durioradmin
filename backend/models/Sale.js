const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  products: [{
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 }
  }],
  total: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Processing', 'Completed', 'Cancelled'], 
    default: 'Pending' 
  },
  date: { type: Date, default: Date.now },
  notes: { type: String },
  paymentMethod: { type: String, default: 'Cash' }
}, {
  timestamps: true
});

module.exports = mongoose.model("Sale", SaleSchema);
