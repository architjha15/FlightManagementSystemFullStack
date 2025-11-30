const flightDetails = require("../Models/flightModel");
const xlsx = require("xlsx");

const importFlight = async () => {
  const workbook = xlsx.readFile("./Data/flightData.xlsx", { cellDates: true });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet);
  return await flightDetails.insertMany(data);
};

const fetchFlight = async () => {
  return await flightDetails.find();
};

const flightToFilter = async (stringDate, source, destination) => {
  const filterDate = new Date(stringDate);
  const firstDate = filterDate;
  firstDate.setHours(0, 0, 0, 0);
  const startDate = new Date(
    firstDate.getTime() - firstDate.getTimezoneOffset() * 60000
  );
  const lastDate = filterDate;
  lastDate.setHours(23, 59, 59, 999);
  const endDate = new Date(
    lastDate.getTime() - lastDate.getTimezoneOffset() * 60000
  );
  return await flightDetails.find({
    flightDate: {
      $gte: startDate,
      $lte: endDate,
    },
  });
};

const flightToFilterSD = async (stringDate, source, destination) => {
  const filterDate = new Date(stringDate);
  const firstDate = filterDate;
  firstDate.setHours(0, 0, 0, 0);
  const startDate = new Date(
    firstDate.getTime() - firstDate.getTimezoneOffset() * 60000
  );
  const lastDate = filterDate;
  lastDate.setHours(23, 59, 59, 999);
  const endDate = new Date(
    lastDate.getTime() - lastDate.getTimezoneOffset() * 60000
  );
  return await flightDetails.find({
    source: {
      $regex: source,
    },
    destination: {
      $regex: destination,
    },
    flightDate: {
      $gte: startDate,
      $lte: endDate,
    },
  });
};

module.exports = {
  importFlight,
  fetchFlight,
  flightToFilter,
  flightToFilterSD,
};
