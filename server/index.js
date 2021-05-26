require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");

const PORT = process.argv[2] || process.env.PORT;

const app = express();

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
};

start();
