const layovers = require("../Models/layoverModel");
const city = require("../Models/cityModel");
const xlsx = require("xlsx");

const importlayovers = async () => {
  const workbook1 = xlsx.readFile("./Data/flightData.xlsx");
  const sheetName = workbook1.SheetNames[0];
  const worksheet = workbook1.Sheets[sheetName];
  let data = xlsx.utils.sheet_to_json(worksheet);

  return await layovers.insertMany(data);
};

const dataFetching = async () => {
  return await layovers.find({});
};

const fetchFilterData = async (flightID) => {
  if (!flightID) {
    return { message: "No id found!" };
  } else {
    const data = await layovers.findOne({
      flightID: {
        $regex: flightID,
      },
    });
    const cityName = await city.findOne({
      cityID: {
        $regex: "149",
      },
    })
    if (!data || !cityName) {
      return { message: "No match found." };
    }
    return {data, cityName};
  }
};

module.exports = { importlayovers, dataFetching, fetchFilterData };
