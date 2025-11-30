const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose
      .connect("mongodb://127.0.0.1:27017/newFlightManagementSystem")
      .then(() => console.log("Connection established!"));
  } catch (error) {
    console.error("Error occured!", error);
  }
};

module.exports = dbConnection;
