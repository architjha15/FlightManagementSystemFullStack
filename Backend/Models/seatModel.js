const mongoose = require("mongoose");

const ISTDate = () => {
  const currentDate = new Date();
  currentDate.setMinutes(currentDate.getMinutes() + 330);
  return currentDate;
};

const seatDetail = new mongoose.Schema({
  flightID: {
    type: String,
    unique: true,
    required: true,
  },
  ecoSeats: {
    type: Number,
    required: true,
  },
  businessSeats: {
    type: Number,
    required: true,
  },
  onDate: {
    type: Date,
    required: true,
    default: ISTDate,
  },
});

module.exports = mongoose.models.seats || mongoose.model("seats", seatDetail);
