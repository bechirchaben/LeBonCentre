const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const formationRoutes = require("./routes/formations");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb+srv://marwan:04Sept1990@leboncentre.e1yskoc.mongodb.net/?retryWrites=true&w=majority&appName=LeBonCentre")
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/api/formations", formationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
