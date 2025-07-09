require("dotenv").config();
const mongoose = require("mongoose");
const Sale = require("./models/Sale");

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("🟢 Connected to MongoDB for seeding");

    return Sale.insertMany([
      {
        customer: {
          name: "John Smith",
          email: "john@example.com",
          phone: "+1-555-0123"
        },
        products: [
          { name: "Brake Pads", category: "Brakes", price: 45.99, quantity: 2 }
        ],
        total: 1200,
        status: "Completed",
        date: new Date("2025-06-24")
      },
      {
        customer: {
          name: "Sarah Johnson",
          email: "sarah@example.com",
          phone: "+1-555-0456"
        },
        products: [
          { name: "Oil Filter", category: "Engine", price: 12.99, quantity: 5 }
        ],
        total: 1450,
        status: "Completed",
        date: new Date("2025-06-25")
      },
      {
        customer: {
          name: "Mike Wilson",
          email: "mike@example.com",
          phone: "+1-555-0789"
        },
        products: [
          { name: "Air Filter", category: "Engine", price: 18.99, quantity: 3 }
        ],
        total: 1630,
        status: "Pending",
        date: new Date("2025-06-26")
      },
      {
        customer: {
          name: "Lisa Brown",
          email: "lisa@example.com",
          phone: "+1-555-0112"
        },
        products: [
          { name: "Spark Plugs", category: "Engine", price: 8.99, quantity: 10 }
        ],
        total: 980,
        status: "Completed",
        date: new Date("2025-06-27")
      },
      {
        customer: {
          name: "David Lee",
          email: "david@example.com",
          phone: "+1-555-0134"
        },
        products: [
          { name: "Battery", category: "Electrical", price: 89.99, quantity: 2 }
        ],
        total: 1720,
        status: "Completed",
        date: new Date("2025-06-28")
      }
    ]);
  })
  .then(() => {
    console.log("✅ Sample sales data inserted");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Seeding error:", err);
    mongoose.disconnect();
  });

  