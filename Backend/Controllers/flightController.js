const flight = require("../Services/flightService");
const Flight = require("../Models/flightModel");

const flightInsert = async (req, res) => {
  try {
    await flight.importFlight();
    res.status(200).json({ message: "Flight data successfully imported." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchFlightData = async (req, res) => {
  try {
    const data = await flight.fetchFlight();
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const filterFlight = async (req, res) => {
  const { stringDate } = req.body;
  if (!stringDate) {
    res.status(400).json({ message: "JSON is empty." });
  } else {
    try {
      const dataFilter = await flight.flightToFilter(stringDate);
      res.status(200).json({ message: dataFilter });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

const filterSourceDes = async (req, res) => {
  const { stringDate, source, destination } = req.body;
  if (!stringDate || !source || !destination) {
    res.status(400).json({ message: "JSON is empty." });
  } else {
    try {
      const dataFilter = await flight.flightToFilterSD(
        stringDate,
        source,
        destination
      );
      res.status(200).json({ message: dataFilter });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

// --- 🌟 UPDATED SEARCH FUNCTION ---
const searchFlights = async (req, res) => {
  try {
    const { from, to, date } = req.query;

    if (!from || !to || !date) {
      return res.status(400).json({ message: "Missing search parameters" });
    }

    // 1. Better Date Logic (Full Day Coverage 00:00 to 23:59)
    const searchDate = new Date(date);
    const startDate = new Date(searchDate);
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(searchDate);
    endDate.setUTCHours(23, 59, 59, 999);

    const flights = await Flight.aggregate([
      {
        $match: {
          source: new RegExp(`^${from}$`, "i"),
          destination: new RegExp(`^${to}$`, "i"),
          flightDate: { $gte: startDate, $lte: endDate }
        }
      },

      // 2. PRICE JOIN
      {
        $lookup: {
          from: "flightprices",
          localField: "flightID",
          foreignField: "flightID",
          as: "priceData",
        }
      },
      {
        $unwind: {
          path: "$priceData",
          preserveNullAndEmptyArrays: true
        }
      },

      // 3. SEAT JOIN
      {
        $lookup: {
          from: "seats",
          localField: "flightID",
          foreignField: "flightID",
          as: "seatData"
        }
      },
      {
        $unwind: {
          path: "$seatData",
          preserveNullAndEmptyArrays: true
        }
      },

      // 4. LAYOVER JOIN
      {
        $lookup: {
          from: "layovers",
          localField: "flightID",
          foreignField: "flightID",
          as: "layoverData"
        }
      },
      {
        $unwind: {
          path: "$layoverData",
          preserveNullAndEmptyArrays: true
        }
      },

      // 5. PROJECT (Formatting the Output)
      {
        $project: {
          _id: 1,
          flightID: 1,
          airline: 1,
          
          // 🌟 Fix: Send BOTH names to satisfy Search Page AND Booking Page
          source: "$source", 
          from: "$source", 
          
          destination: "$destination",
          to: "$destination",

          // 🌟 Fix: Send correct time variable names
          departureTime: 1,
          depart: "$departureTime", // Alias for older frontend code
          
          arrivalTime: 1,
          arrive: "$arrivalTime", // Alias for older frontend code
          
          flightDate: 1,
          duration: 1,

          price: "$priceData.ecoPrice",
          businessPrice: "$priceData.businessPrice",

          // 🌟 Fix: Create the 'seatInfo' object for the Booking Page
          seatInfo: {
             ecoSeats: "$seatData.ecoSeats",
             businessSeats: "$seatData.businessSeats"
          },
          // Keep old field for safety
          seatsAvailable: "$seatData.ecoSeats",

          // Layover fields
          stops: { $ifNull: ["$layoverData.stops", 0] },
          layoverInfo: {
             stops: { $ifNull: ["$layoverData.stops", 0] },
             layoverDuration: "$layoverData.layoverDuration",
             cityID: "$layoverData.cityID"
          },
          layoverDuration: {
            $cond: [
              { $eq: ["$layoverData.stops", 0] },
              null,
              "$layoverData.layoverDuration"
            ]
          }
        }
      }
    ]);

    return res.status(200).json(flights);

  } catch (err) {
    console.error("Search Error:", err);
    res.status(500).json({ message: "Error fetching flights" });
  }
};

module.exports = {
  flightInsert,
  fetchFlightData,
  filterFlight,
  filterSourceDes,
  searchFlights,
};