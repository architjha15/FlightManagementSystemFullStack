const mongoose = require("mongoose");

const flightDetail = new mongoose.Schema({
  flightID: {
    type: String,
    required: true,
    unique: true,
  },
  airline: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  departureTime: {
    type: String,
    required: true,
  },
  arrivalTime: {
    type: String,
    required: true,
  },
  flightDate: {
    type: Date,
    required: true,
  },
  destinationDate: {
    type: Date,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("flightDetails", flightDetail);