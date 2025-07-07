import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/navbar";
import HomePage from "./pages/HomePage";
import Footer from "./components/footer";
import Heraldica from "./pages/heraldica";
import Sugestao from "./pages/sugestao";
<<<<<<< HEAD
import Historia from "./pages/historia";
=======
>>>>>>> fad56f919b020db9804d1ad38405d2728cfd241e

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/heraldica" element={<Heraldica/>}/>
        <Route path="/form" element={<Sugestao/>}/>
<<<<<<< HEAD
        <Route path="/historia" element={<Historia/>}/>
=======
>>>>>>> fad56f919b020db9804d1ad38405d2728cfd241e
      </Routes>
    </BrowserRouter>
  );
}

export default App;