import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/header.tsx";
import Footer from "./components/footer.tsx";
import Home from "./pages/home.tsx";
import Dashboard from "./admin/Dashboard.tsx";
import FormationList from "./admin/FormationList.tsx";
import Login from "./pages/Login.tsx";
import AddFormation from "./admin/AddFormation.tsx";
import EditFormation from "./admin/EditFormation.tsx";
import Compare1v1 from "./pages/Compare1v1.tsx";
function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((res) => setMsg(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Router>
      <div style={{ paddingBottom: "60px" }}>
        <Header />

        <main style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/compare" element={<Compare1v1 />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/formations" element={<FormationList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/ajouter" element={<AddFormation />} />
            <Route path="/admin/edit/:id" element={<EditFormation />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
