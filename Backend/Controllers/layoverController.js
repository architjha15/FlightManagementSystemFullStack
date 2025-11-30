const layover = require("../Services/layoverService");

const insertLayover = async (req, res) => {
  try {
    await layover.importlayovers();
    res.status(200).json({ message: "Layover details imported successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchLayover = async (req, res) => {
  try {
    const data = await layover.dataFetching();
    res.status(200).json({message: data});
  } catch (error) {
    res.status(500).json({message: error.message});
    
  }
}

const flightIDFilter = async (req, res) => {
  const { flightID } = req.body;
  if(!flightID){
    res.status(400).json({message: "FlightID is missing!"});
  } else{
    try {
      const filterData = await layover.fetchFilterData(flightID);
      res.status(200).json({message: filterData});
    } catch (error) {
      res.status(500).json({message: message.error});
      
    }
  }
}

module.exports = { insertLayover, fetchLayover, flightIDFilter };
