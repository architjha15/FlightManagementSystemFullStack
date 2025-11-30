const mongoose = require("mongoose");
const crypto = require("crypto");
const cityModel = require("./cityModel");

const aeroLayover = new mongoose.Schema({
  flightID: {
    type: String,
    required: true,
    unique: true,
    ref: "flightDetails",
  },
  cityID: {
    type: String,
    required: true,
    default: "149",
    ref: "cityModel",
  },
  layoverDuration: {
    type: Number,
    required: true,
    default: () => crypto.randomInt(30, 61),
  },
  stops: {
    type: Number,
    default: () => crypto.randomInt(0, 2),
  },
});

module.exports = mongoose.model("layovers", aeroLayover);
