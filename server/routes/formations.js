const express = require("express");
const router = express.Router();
const Formation = require("../models/Formation");

// GET formations avec filtres + tri
router.get("/", async (req, res) => {
  try {
    const { region, departement, type, sortBy, order } = req.query;
    const filter = {};
    if (region) filter.region = region;
    if (departement) filter.departement = departement;
    if (type) filter.type = type;

    const sort = {};

    if (sortBy) {
      // Ex : sortBy = 'prix', order = 'asc' ou 'desc'
      sort[sortBy] = order === "desc" ? -1 : 1;
    }

    const formations = await Formation.find(filter).sort(sort);
    res.json(formations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Incrémenter le nombre de clics
router.post("/:id/click", async (req, res) => {
  try {
    await Formation.findByIdAndUpdate(req.params.id, {
      $inc: { clicks: 1 },
    });
    res.status(204).send();
  } catch (err) {
    console.error("Erreur d'incrément clic :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});


// ✅ GET formations par type (via paramètre URL)
router.get("/:type", async (req, res) => {
  try {
    const type = req.params.type;
    const formations = await Formation.find({ type: new RegExp(type, "i") });
    res.json(formations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ POST - Ajouter une formation
router.post("/", async (req, res) => {
  try {
    const formation = new Formation({
      type: req.body.type,
      prix: req.body.prix,
      duree: req.body.duree,
      region: req.body.region,
      departement: req.body.departement,
      agence: req.body.agence,
      avis: req.body.avis,
      siteweb: req.body.siteweb, // 🔥 Important ici
    });

    await formation.save();
    res.status(201).json(formation);
  } catch (err) {
    console.error("❌ Erreur d'ajout :", err);
    res.status(400).json({ message: err.message });
  }
});

// ✅ PUT - Modifier une formation
router.put("/:id", async (req, res) => {
  try {
    const updated = await Formation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Formation non trouvée" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ DELETE - Supprimer une formation
router.delete("/:id", async (req, res) => {
  try {
    const result = await Formation.findByIdAndDelete(req.params.id);
    if (!result)
      return res.status(404).json({ message: "Formation non trouvée" });
    res.json({ message: "Formation supprimée" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
