const seat = require("../Services/seatService");

const seatData = async (req, res) => {
  try {
    await seat.importSeats();
    res.status(200).json({ message: "Seats data imported successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchSeats = async (req, res) => {
  try {
    data = await seat.seats_fetch();
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const filterSeats = async (req, res) => {
  const { flightID } = req.body;
  if (!flightID) {
    res.status(400).json({ message: "FlightID not found!" });
  } else {
    try {
      const seatFilterData =await seat.seatFetch(flightID);
      res.status(200).json({ message: seatFilterData });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

const seatBook = async (req, res) => {
  const { flightID, economyClass, businessClass } = req.body;
  if (!flightID) {
    res.status(400).json({message: "flightID is missing."});
  } else {
    try {
      const booking = await seat.bookingSeat(flightID, economyClass, businessClass);
      res.status(200).json({message: "Congratulation! Seat booking confirmed."});
    } catch (error) {
      res.status(500).json({message: "Error! Please try again...", error});
    }
  }
}

const classSeat = async (req,res) => {
  const { seatClass } = req.body;
  if(!seatClass){
    res.status(400).json({message: "JSON is empty!"});
  }else{
    try {
      const seatsByClass = await seat.findSeat(seatClass);
      res.status(200).json({message: seatsByClass});
    } catch (error) {
      res.status(500).json({message: "Server error:", error});
      
    }
  }
}

module.exports = { seatData, fetchSeats, filterSeats, seatBook, classSeat };
