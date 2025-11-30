const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  bookingID: { type: String, required: true, unique: true }, // e.g., "ORD-12345"
  flightID: { type: String, required: true },

  // Passenger Details
  passengerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },

  // Flight Details
  source: { type: String, required: true },
  destination: { type: String, required: true },
  flightDate: { type: Date, required: true },

  // Ticket Details
  ticketClass: { type: String, enum: ["economy", "business"], required: true },
  totalPrice: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("bookings", bookingSchema);
