import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/navbar";

function Home() {
  return (
    <div>
      <h1>Página Inicial</h1>
      <Link to="/navbar">Ir para Navbar</Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/navbar" element={<Navbar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;