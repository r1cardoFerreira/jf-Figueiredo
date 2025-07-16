import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/navbar";
import HomePage from "./pages/HomePage";
import Footer from "./components/footer";
import Heraldica from "./pages/heraldica";
import Sugestao from "./pages/sugestao";
import Historia from "./pages/historia";
import CorpoSocial from "./pages/corposocial";
import Associacoes from "./pages/associacoes";
import Login from "./pages/admin/login";
import AdminNavbar from "./components/admin/navbar_admin";
import AssociationForm from "./pages/admin/associacoesAdmin";
import AssociacoesDetalhes from "./pages/associacoesDetalhes";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/heraldica" element={<Heraldica/>}/>
        <Route path="/form" element={<Sugestao/>}/>
        <Route path="/historia" element={<Historia/>}/>
        <Route path="/Sugestao" element={<Sugestao/>}/>
        <Route path="/corposocial" element={<CorpoSocial/>}/>
        <Route path="/associacoes" element={<Associacoes/>}/>
        <Route path="/admin" element={<Login/>}/>
        <Route path="/navbaradmin" element={<AdminNavbar/>}/>
        <Route path="/associacoesadmin" element={<AssociationForm/>}/>
        <Route path="/associacoesdetalhes/:id" element={<AssociacoesDetalhes/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;