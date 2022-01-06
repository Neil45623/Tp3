const express = require("express");
const mongoose = require("mongoose");
const createServer = require("./server");
require("dotenv").config();

mongoose.connect(`${process.env.DB_DIALECT}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, { useNewUrlParser: true }).then(() => {
  const app = createServer();

  app.listen(3000, () => {
    console.log("Le serveur est allumé !");
  });
});
