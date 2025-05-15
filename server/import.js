const mongoose = require("mongoose");
const Formation = require("./models/Formation");
const data = require("./data/formations.json");

mongoose.connect("mongodb://localhost:27017/formations");

Formation.insertMany(data)
  .then(() => {
    console.log("Données importées avec succès.");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
