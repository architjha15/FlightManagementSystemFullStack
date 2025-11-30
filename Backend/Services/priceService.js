const prices = require("../Models/priceModel");
const xlsx = require("xlsx");

const importPrices = async () => {
  const workbook = xlsx.readFile("./Data/flightData.xlsx");
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet);
  return await prices.insertMany(data);
};

const price_fetch = async () => {
  return await prices.find({});
};

const priceInfo = async (flightID) => {
  return await prices.find({
    flightID: {
      $regex: flightID,
    },
  });
};

const flights = async (flightClass) => {
  if (flightClass == "E") {
    return await prices.find({}, { flightID: 1, ecoPrice: 1 });
  } else if (flightClass == "B") {
    return await prices.find({}, { flightID: 1, businessPrice: 1 });
  } else {
    return await prices.find({});
  }
};

const fetchData = async (flightID, flightClass) => {
  if (flightClass == "E") {
    const flightInfo = await prices.findOne({
      flightID: {
        $regex: flightID,
      },
    });
    if (flightInfo) {
      return {
        flightID: flightInfo.flightID,
        ecoPrice: flightInfo.ecoPrice,
      };
    } else {
      return { message: "No flight found!" };
    }
  } else if (flightClass == "B") {
    const flightPrice = await prices.findOne({
      flightID: {
        $regex: flightID,
      },
    });
    if (flightPrice) {
      return {
        flightID: flightPrice.flightID,
        ecoPrice: flightPrice.businessPrice,
      };
    } else {
      return { message: "No flight found!" };
    }
  } else {
    return await prices.find({});
  }
};

module.exports = { importPrices, price_fetch, priceInfo, flights, fetchData };
