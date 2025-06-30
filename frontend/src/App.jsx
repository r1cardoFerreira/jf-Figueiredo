import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/navbar";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/navbar" element={<Navbar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;