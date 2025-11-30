const city = require("../Services/cityService");

const cityInsert = async (req, res) => {
  try {
    await city.cityImport();
    res.status(200).json({ message: "Successfully city data imported." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchCity = async (req, res) => {
  try {
    const data = await city.displayData({});
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { cityInsert, fetchCity };
