import React, { useEffect, useState } from "react";
import Sidebar from "../admin/Sidebar.tsx";
import { Typography } from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SchoolIcon from "@mui/icons-material/School";
import BusinessIcon from "@mui/icons-material/Business";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ClickChart from "../admin/ClickChart.tsx";
import { motion } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();
  const [formations, setFormations] = useState<any[]>([]);
  const [totalClicks, setTotalClicks] = useState(0);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      navigate("/login");
    }

    fetchFormations();
    const interval = setInterval(fetchFormations, 10000);
    return () => clearInterval(interval);
  }, [navigate]);

  const fetchFormations = () => {
    axios
      .get("http://localhost:5000/api/formations")
      .then((res) => {
        setFormations(res.data);
        const total = res.data.reduce((sum: number, f: any) => sum + (f.clicks || 0), 0);
        setTotalClicks(total);
      })
      .catch((err) => console.error("Erreur chargement formations :", err));
  };

  const cards = [
    {
      title: "Formations",
      value: formations.length,
      icon: <SchoolIcon fontSize="large" className="text-blue-500" />,
    },
    {
      title: "Agences",
      value: new Set(formations.map((f) => f.agence)).size,
      icon: <BusinessIcon fontSize="large" className="text-green-500" />,
    },
    {
      title: "Avis",
      value: formations.reduce((sum, f) => sum + Number(f.avis || 0), 0),
      icon: <StarIcon fontSize="large" className="text-yellow-500" />,
    },
    {
      title: "Clics",
      value: totalClicks,
      icon: <AssessmentIcon fontSize="large" className="text-purple-500" />,
    },
  ];

  // ✅ Agrégation des clics par type
  const groupedData = formations.reduce((acc: any, curr: any) => {
    if (!acc[curr.type]) acc[curr.type] = 0;
    acc[curr.type] += curr.clicks || 0;
    return acc;
  }, {});

  const chartData = Object.entries(groupedData).map(([type, clicks]) => ({
    type,
    clicks,
  }));

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <Sidebar />

      <div className="flex-1 p-6 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 📦 Cartes statiques */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white text-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center"
              >
                <div className="text-4xl mb-2">{card.icon}</div>
                <div className="text-xl font-semibold mb-1">{card.title}</div>
                <div className="text-2xl font-bold text-indigo-700">{card.value}</div>
              </motion.div>
            ))}
          </div>

          {/* 📊 Graphique des clics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white mt-12 rounded-lg shadow p-6"
          >
            <Typography
              variant="h6"
              className="mb-4 text-gray-700 tracking-wide text-lg font-semibold"
            >
              📈 Clics par formation
            </Typography>
            <ClickChart data={chartData} />
          </motion.div>
        </motion.div>
        {/* 🏆 Top 5 des formations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.4 }}
  className="bg-white mt-8 rounded-lg shadow p-6"
>
  <Typography variant="h6" className="mb-4 text-gray-700 font-semibold">
    🏆 Top 5 des formations les plus cliquées
  </Typography>
  <table className="w-full text-left table-auto">
    <thead>
      <tr className="text-sm text-gray-600 border-b">
        <th className="py-2">#</th>
        <th className="py-2">Type de formation</th>
        <th className="py-2">Total clics</th>
      </tr>
    </thead>
    <tbody>
      {Object.values(
        formations.reduce((acc: any, f: any) => {
          if (!acc[f.type]) acc[f.type] = { type: f.type, clicks: 0 };
          acc[f.type].clicks += f.clicks || 0;
          return acc;
        }, {})
      )
        .sort((a: any, b: any) => b.clicks - a.clicks)
        .slice(0, 5)
        .map((item: any, index: number) => (
          <tr key={index} className="border-t text-sm">
            <td className="py-2">{index + 1}</td>
            <td className="py-2 font-medium">{item.type}</td>
            <td className="py-2 text-indigo-600 font-bold">{item.clicks}</td>
          </tr>
        ))}
    </tbody>
  </table>
</motion.div>
{/* 🏆 Top 5 des sites les plus visités */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.3 }}
  className="bg-white mt-8 rounded-lg shadow p-6"
>
  <Typography
    variant="h6"
    className="mb-4 text-gray-600 tracking-wide text-lg font-semibold" 
  >
    🏆 Top 5 des sites web les plus visités
  </Typography>

  <ol className="space-y-3 list-decimal list-inside text-gray-700">
    {formations
      .filter((f) => f.siteweb)
      .sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
      .slice(0, 5)
      .map((f, i) => (
        <li key={i}>
          <a
            href={f.siteweb}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            {f.siteweb}
          </a>{" "}
          — {f.clicks || 0} clics
        </li>
      ))}
  </ol>
</motion.div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
