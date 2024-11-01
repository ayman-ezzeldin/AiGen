require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");


mongoose
  .connect(
    process.env.MONGODB_URI,
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'cache-control',
      'Expires',
      'pragma',
    ],
    credentials: true,
  })
);

app.use(cookieParser())
app.use(express.json());
app.use('/api/auth',authRouter)



app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
