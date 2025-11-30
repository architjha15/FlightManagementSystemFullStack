const mongoose = require("mongoose");

const aeroCity = new mongoose.Schema({
  cityID: {
    type: String,
    required: true,
    unique: true,
  },
  cityCode: {
    type: String,
    required: true,
  },
  cityName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("cities", aeroCity);
