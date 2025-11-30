const city = require("../Controllers/cityController");
const express = require("express");
const router = express.Router();

router.post("/import", city.cityInsert);
router.get("/fetch", city.fetchCity);


module.exports = router;
