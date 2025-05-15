const mongoose = require("mongoose");

const formationSchema = new mongoose.Schema({
  type: { type: String, required: true },         // VTC, TAXI, etc.
  prix: { type: Number, required: true },
  duree: { type: String, required: true },         // exemple : "3 semaines"
  region: { type: String, required: true },
  departement: { type: String, required: true },
  agence: { type: String, required: true },
  avis: { type: Number, default: 0 },  
  siteweb: {type: String, required: true },     
  clicks: {
    type: Number,
    default: 0,
  },   
});

module.exports = mongoose.model("Formation", formationSchema);
