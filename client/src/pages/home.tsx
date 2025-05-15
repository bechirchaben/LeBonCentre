import React from "react";
import { Link } from "react-router-dom"; // Make sure you're using React Router
import FranceMap from "../pages/FranceMap.tsx";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-700 leading-tight mb-4">
          Comparez les formations<br className="hidden sm:block" /> près de chez vous
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-md sm:max-w-xl mx-auto mb-6">
          Trouvez un centre de formation VTC, Taxi, Permis B/C ou Moniteur auto-école selon votre région.
        </p>

        {/* 🔐 Admin Access Button */}
        <Link
          to="/admin"
          className="inline-block mt-4 px-6 py-2 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition"
        >
          👨‍💻 Accès Admin
        </Link>
      </section>

      {/* Map Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-10 border border-gray-200">
          <div className="w-full overflow-x-auto">
            <FranceMap />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
