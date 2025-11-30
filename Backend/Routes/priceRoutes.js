const price = require("../Controllers/priceController");
const express = require("express");
const router = express.Router();

router.post("/import", price.insertPrice);
router.get("/fetch", price.fetchPrice);
router.get("/filter_flight", price.priceFiter);
router.get("/priceByClass", price.classPrice);
router.post("/fliterByIDClass", price.FlightsByIDClass);
module.exports = router;
