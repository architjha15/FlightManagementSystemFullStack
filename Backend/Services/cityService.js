const xlsx = require("xlsx");
const city = require("../Models/cityModel");

const cityImport = async () => {
  const workbook = xlsx.readFile("./Data/airportCodes.xlsx");
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet);
  return await city.insertMany(data);
};

const displayData = async () => {
  return await city.find({});
}

module.exports = { cityImport, displayData };
