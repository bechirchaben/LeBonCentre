// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        header: '0 2px 4px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
