import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/navbar";
import HomePage from "./pages/HomePage";
import Footer from "./components/footer";
import Heraldica from "./pages/heraldica";
import Sugestao from "./pages/sugestao";
import Historia from "./pages/historia";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/heraldica" element={<Heraldica/>}/>
        <Route path="/form" element={<Sugestao/>}/>
        <Route path="/historia" element={<Historia/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;