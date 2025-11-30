const express = require("express");
const router = express.Router();
const bookingController = require("../Controllers/bookingController");

router.post("/create", bookingController.createBooking);
router.get("/my-bookings", bookingController.getUserBookings);
router.post('/resend-email', bookingController.resendBookingEmail);

module.exports = router;