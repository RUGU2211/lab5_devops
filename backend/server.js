const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// MongoDB Connection
const PORT = 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/mernDB";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
