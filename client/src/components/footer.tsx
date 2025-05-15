// client/src/components/Footer.tsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-4 border-t text-sm text-center">
      <div className="max-w-6xl mx-auto px-4">
        &copy; {new Date().getFullYear()} <span className="font-semibold text-blue-600">LeBonCentre</span> — Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
