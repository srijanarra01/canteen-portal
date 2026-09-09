require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// routes
// var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/Users");
var VendorRouter = require("./routes/Vendors");
var ItemRouter = require("./routes/Items");
var UserAuth = require("./routes/user_auth");
var VendorAuth = require("./routes/vendor_auth");
var OrderRouter = require("./routes/Orders");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB (Atlas URI or local fallback)
const mongoURI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/test";

mongoose.connect(mongoURI);
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully !");
});
connection.on("error", function (err) {
  console.error("MongoDB connection error:", err.message);
});

const port = process.env.PORT || 4000;

// setup API endpoints
// app.use("/testAPI", testAPIRouter);
app.use("/user", UserRouter);
app.use("/vendor", VendorRouter);
app.use("/item", ItemRouter);
app.use("/user_auth", UserAuth);
app.use("/vendor_auth", VendorAuth);
app.use("/order", OrderRouter);

app.listen(port, () => console.log(`Server is running on Port: ${port}`));
