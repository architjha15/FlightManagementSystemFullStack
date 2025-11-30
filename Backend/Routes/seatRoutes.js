const seat = require("../Controllers/seatController");
const express = require("express");
const router = express.Router();

router.post("/import", seat.seatData);
router.get("/fetch", seat.fetchSeats);
router.get("/filter_seats", seat.filterSeats);
router.post("/bookseat", seat.seatBook);
router.get("/seatsByClass", seat.classSeat);
module.exports = router;
