const Booking = require("../Models/bookingModel");
const Seat = require("../models/seatModel"); // Assuming you have a seat model
const { sendConfirmationEmail } = require("../Services/emailService");
const crypto = require("crypto");

exports.createBooking = async (req, res) => {
  const { flightID, passenger, ticketClass, flightDetails, price } = req.body;

  try {
    // 1. Determine which field to update (ecoSeats or businessSeats)
    const seatField = ticketClass === "business" ? "businessSeats" : "ecoSeats";

    // 2. ATOMIC UPDATE: Find flight AND decrement seat in one go.
    // This ensures we don't double-book if 2 people click at the same time.
    const updatedSeat = await Seat.findOneAndUpdate(
      {
        flightID: flightID,
        [seatField]: { $gt: 0 }, // Condition: Seats must be greater than 0
      },
      { $inc: { [seatField]: -1 } }, // Action: Decrease by 1
      { new: true } // Return the updated document
    );

    if (!updatedSeat) {
      return res
        .status(400)
        .json({ message: "Booking Failed: No seats available." });
    }

    // 3. Generate a random Booking ID (e.g., "B-98A7")
    const bookingID =
      "B-" + crypto.randomBytes(2).toString("hex").toUpperCase();

    // 4. Save the Booking Record
    const newBooking = new Booking({
      bookingID,
      flightID,
      passengerName: passenger.fullName,
      email: passenger.email,
      phone: passenger.phone,
      source: flightDetails.source,
      destination: flightDetails.destination,
      flightDate: flightDetails.flightDate,
      ticketClass,
      totalPrice: price,
    });

    await newBooking.save();

    res.status(201).json({
      message: "Booking Confirmed",
      bookingID: bookingID,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error during booking" });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const { email } = req.query;

    let query = {};

    // If an email is provided, search for it (Case Insensitive)
    if (email) {
      query.email = { $regex: new RegExp(`^${email}$`, "i") }; 
    }
    // If NO email is provided, 'query' remains {}, so it will fetch ALL tickets.

    const bookings = await Booking.find(query).sort({ bookingDate: -1 });

    if (bookings.length === 0) {
        // Optional: Log to terminal to see what's happening
        console.log(`No bookings found for query:`, query);
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

exports.resendBookingEmail = async (req, res) => {
  const { bookingID } = req.body;

  try {
    // 1. Find the booking in the database
    const booking = await Booking.findOne({ bookingID });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // 2. Prepare the email data
    const ticketData = {
      ticketId: booking.bookingID,
      amount: booking.totalPrice,
      // You can add more details here if your email template supports it
    };

    // 3. Send the email using the user's email saved in the DB
    await sendConfirmationEmail(booking.email, ticketData);

    res.status(200).json({ message: "Ticket sent to email successfully!" });

  } catch (error) {
    console.error("Error resending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
};