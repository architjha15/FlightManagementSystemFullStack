const express = require("express");
const cors = require("cors");
const city = require("./Routes/cityRoutes");
const flight = require("./Routes/flightRoutes");
const layover = require("./Routes/layoverRoutes");
const price = require("./Routes/priceRoutes");
const seat = require("./Routes/seatRoutes");
const user = require("./Routes/userRoutes");
const bookingRoutes = require("./Routes/bookingRoutes");
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/city", city);
app.use("/api/flights", flight);
app.use("/api/layover", layover);
app.use("/api/price", price);
app.use("/api/seats", seat);
app.use("/api", user);
app.use("/api/bookings", bookingRoutes);

module.exports = app;
