const seatData = require("../Models/seatModel");
const xlsx = require("xlsx");
const { json } = require("express");

const importSeats = async () => {
  const workbook = xlsx.readFile("./Data/flightData.xlsx");
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet);

  return await seatData.insertMany(data);
};

const seats_fetch = async () => {
  return await seatData.find({});
};

const seatFetch = async (flightID) => {
  return await seatData.find({
    flightID: {
      $regex: flightID,
    },
  });
};

const bookingSeat = async (flightID, economyClass, businessClass) => {
  try {
    const seatConfirm = await seatData.findOne({
      flightID: {
        $regex: flightID,
      },
    });
    if (
      seatConfirm.ecoSeats >= economyClass &&
      seatConfirm.businessSeats >= businessClass
    ) {
      seatConfirm.ecoSeats -= economyClass;
      seatConfirm.businessSeats -= businessClass;
      await seatConfirm.save();
    } else {
      console.log("Not enough seats left.");
    }
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
};

const findSeat = async (seatClass) => {
  if (seatClass == "E") {
    return await seatData.find({}, { flightID: 1, ecoSeats: 1 });
  } else if (seatClass == "B") {
    return await seatData.find({}, { flightID: 1, businessSeats: 1 });
  } else {
    return json({ message: "Enter a valid class!" });
  }
};

module.exports = { importSeats, seats_fetch, seatFetch, bookingSeat, findSeat };
