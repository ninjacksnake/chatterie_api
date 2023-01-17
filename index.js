const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use('/api/auth',  userRoutes)

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("db connectio stablished");
  })
  .catch((err) => {
    if (err) {
      console.log(err);
    }
  });

const server = app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
