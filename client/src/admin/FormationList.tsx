// FormationList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddFormation from "../admin/AddFormation.tsx";

const FormationList = () => {
  const [formations, setFormations] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [search, setSearch] = useState("");

  const fetchFormations = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/formations")
      .then((res) => {
        setFormations(res.data);
        setFiltered(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur API:", err);
        setLoading(false);
      });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Supprimer ?")) return;
    await axios.delete(`http://localhost:5000/api/formations/${id}`);
    fetchFormations();
  };

  const handleEditClick = (formation: any) => {
    setEditingId(formation._id);
    setEditForm({ ...formation });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await axios.put(`http://localhost:5000/api/formations/${editingId}`, {
      ...editForm,
      prix: Number(editForm.prix),
      avis: Number(editForm.avis),
    });
    setEditingId(null);
    fetchFormations();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value.toLowerCase();
    setSearch(q);
    const filteredList = formations.filter((f) =>
      `${f.type} ${f.region} ${f.agence} ${f.departement}`.toLowerCase().includes(q)
    );
    setFiltered(filteredList);
  };

  useEffect(() => {
    fetchFormations();
  }, []);

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
       <div className="bg-white rounded-xl shadow-md p-6 mb-8">
  <AddFormation onSuccess={fetchFormations} />
</div>

        {loading ? (
          <p>Chargement...</p>
        ) : (
          <div className="overflow-auto bg-white rounded-xl shadow-md">
            {/* Recherche déplacée ici */}
               <h2 className=" p-4 text-2xl font-bold mb-4 text-center px-4 text-blue-700">
              Formations enregistrées
            </h2>
            <div className="p-4">
              <input
                type="text"
                placeholder="🔍 Rechercher par type, région, agence..."
                value={search}
                onChange={handleSearch}
                className="w-full md:max-w-md mx-auto block px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>

         

            <table className="min-w-full text-sm text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700 text-xs uppercase">
                <tr>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Prix (€)</th>
                  <th className="px-4 py-3">Durée</th>
                  <th className="px-4 py-3">Région</th>
                  <th className="px-4 py-3">Département</th>
                  <th className="px-4 py-3">Agence</th>
                  <th className="px-4 py-3">Site web</th>
                  <th className="px-4 py-3">Avis</th>
                  <th className="px-4 py-3">Clicks</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((f: any) => (
                  <tr key={f._id} className="hover:bg-gray-50 transition">
                    {editingId === f._id ? (
                      <>
                        <td className="px-4 py-2">
                          <input value={editForm.type} name="type" onChange={handleEditChange} className="border p-1 rounded w-full" />
                        </td>
                        <td className="px-4 py-2">
                          <input value={editForm.prix} name="prix" type="number" onChange={handleEditChange} className="border p-1 rounded w-full" />
                        </td>
                        <td className="px-4 py-2">
                          <input value={editForm.duree} name="duree" onChange={handleEditChange} className="border p-1 rounded w-full" />
                        </td>
                        <td className="px-4 py-2">
                          <input value={editForm.region} name="region" onChange={handleEditChange} className="border p-1 rounded w-full" />
                        </td>
                        <td className="px-4 py-2">
                          <input value={editForm.departement} name="departement" onChange={handleEditChange} className="border p-1 rounded w-full" />
                        </td>
                        <td className="px-4 py-2">
                          <input value={editForm.agence} name="agence" onChange={handleEditChange} className="border p-1 rounded w-full" />
                        </td>
                        <td className="px-4 py-2">
                          <input value={editForm.siteweb} name="siteweb" type="url" placeholder="https://..." onChange={handleEditChange} className="border p-1 rounded w-full" />
                        </td>
                        <td className="px-4 py-2">
                          <input value={editForm.avis} name="avis" type="number" step="0.1" onChange={handleEditChange} className="border p-1 rounded w-full" />
                        </td>
                        <td className="px-4 py-2">{editForm.clicks || 0}</td>
                        <td className="px-4 py-2 flex justify-center space-x-2">
                          <button onClick={handleUpdate} className="text-green-600 hover:text-green-800">💾</button>
                          <button onClick={() => setEditingId(null)} className="text-gray-500 hover:text-gray-700">✖</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-2">{f.type}</td>
                        <td className="px-4 py-2">{f.prix}</td>
                        <td className="px-4 py-2">{f.duree}</td>
                        <td className="px-4 py-2">{f.region}</td>
                        <td className="px-4 py-2">{f.departement}</td>
                        <td className="px-4 py-2">{f.agence}</td>
                        <td className="px-4 py-2">
                          {f.siteweb ? (
                            <a href={f.siteweb} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">Visiter</a>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-4 py-2">{f.avis}</td>
                        <td className="px-4 py-2">{f.clicks || 0}</td>
                        <td className="px-4 py-2 flex justify-center space-x-2">
                          <button onClick={() => handleEditClick(f)} className="text-blue-600 hover:text-blue-800">✏️</button>
                          <button onClick={() => handleDelete(f._id)} className="text-red-600 hover:text-red-800">🗑️</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormationList;
