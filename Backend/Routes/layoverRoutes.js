const layover = require("../Controllers/layoverController");
const express = require("express");
const router = express.Router();

router.post("/import", layover.insertLayover);
router.get("/fetch", layover.fetchLayover);
router.post("/layoverFilter", layover.flightIDFilter);

module.exports = router;