import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditFormation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: "",
    prix: "",
    duree: "",
    region: "",
    departement: "",
    agence: "",
    avis: "",
    siteweb: "", // ← ici
  });

  const [status, setStatus] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/formations/${id}`)
      .then((res) => {
        setFormData(res.data);
      })
      .catch(() => setStatus("error"));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await axios.put(`http://localhost:5000/api/formations/${id}`, {
        ...formData,
        prix: Number(formData.prix),
        avis: Number(formData.avis),
        siteweb: formData.siteweb, // ← essentiel ici
      });
      setStatus("success");
      setTimeout(() => navigate("/admin"), 1000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Modifier une Formation</h2>
      <form
        onSubmit={handleUpdate}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl"
      >
        {[ 
          { label: "Type", name: "type" },
          { label: "Prix (€)", name: "prix" },
          { label: "Durée", name: "duree" },
          { label: "Région", name: "region" },
          { label: "Département", name: "departement" },
          { label: "Agence", name: "agence" },
          { label: "Avis (note)", name: "avis" },
        ].map((field) => (
          <input
            key={field.name}
            type="text"
            name={field.name}
            placeholder={field.label}
            value={(formData as any)[field.name]}
            onChange={handleChange}
            required
            className="border p-3 rounded"
          />
        ))}

        {/* 🔗 Site web */}
        <input
          type="url"
          name="siteweb"
          placeholder="Lien du site web"
          value={formData.siteweb}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Mettre à jour
        </button>
      </form>

      {status === "success" && (
        <p className="text-green-600 mt-4">✅ Formation mise à jour !</p>
      )}
      {status === "error" && (
        <p className="text-red-600 mt-4">❌ Erreur lors de la modification.</p>
      )}
    </div>
  );
};

export default EditFormation;
