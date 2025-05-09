import { useEffect, useState } from "react";
import axios from "axios";
import Header from './components/header';
import Footer from './components/footer';
import FranceMap from './components/FranceMap';





function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/")
      .then(res => setMsg(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ paddingBottom: '60px' }}>
      <Header />
      <main style={{ padding: '20px' }}>
        <h2>Message du serveur :</h2>
        <p>{msg}</p>
        <FranceMap />
      </main>
      <Footer />
    </div>
  );
}

export default App;
