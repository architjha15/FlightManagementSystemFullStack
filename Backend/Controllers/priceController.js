const price = require("../Services/priceService");

const insertPrice = async (req, res) => {
  try {
    await price.importPrices();
    res.status(200).json({ message: "Price details imported successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchPrice = async (req, res) => {
  try {
    data = await price.price_fetch();
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const priceFiter = async (req, res) => {
  const { flightID } = req.body;
  if (!flightID) {
    res.status(400).json({ message: "FlightID not found!" });
  } else {
    try {
      const filterData = await price.priceInfo(flightID);
      res.status(200).json({ message: filterData });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

const classPrice = async (req, res) => {
  const { flightClass } = req.body;
  if (!flightClass) {
    res.status(400).json({ message: "Flight class is missing." });
  } else {
    try {
      const returnFlight = await price.flights(flightClass);
      res.status(200).json({ message: returnFlight });
    } catch (error) {
      res.status(500).json({ message: "Server error:", error });
    }
  }
};

const FlightsByIDClass = async (req, res) => {
  const { flightID, flightClass } = req.body;
  if (!flightID) {
    res.status(400).json({ message: "FlightID is missing." });
  } else {
    try {
      const data = await price.fetchData(flightID, flightClass);
      res.status(200).json({ message: data });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = {
  insertPrice,
  fetchPrice,
  priceFiter,
  classPrice,
  FlightsByIDClass,
};
