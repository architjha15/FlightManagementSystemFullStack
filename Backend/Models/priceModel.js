const mongoose = require("mongoose");

const aeroPrices = new mongoose.Schema({
  flightID: {
    type: String,
    required: true,
    ref: "flightDetails",
  },
  ecoPrice: {
    type: Number,
    required: true,
  },
  businessPrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("flightPrices", aeroPrices);
