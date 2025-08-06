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
import Toponímia from "./pages/toponomia";
import AdminEventos from "./pages/admin/eventosAdmin";
import AdminGaleria from "./pages/admin/galeriaAdmin"; 
import AdminLocais from "./pages/admin/locaisadmin";
import AdminDocumentos from "./pages/admin/docAdmin"
import Eventos from "./pages/eventos";//tirar isto depois e por este componente na home
import Locais from "./pages/locais";
import Galeria from "./pages/galeria";
import EspacoCidadao from "./pages/espaco_cidadao";


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
        <Route path="/toponimia" element={<Toponímia/>}/>
        <Route path="/eventosadmin" element={<AdminEventos/>}/>
        <Route path="/galeriaadmin" element={<AdminGaleria/>}/>
        <Route path="/locaisadmin" element={<AdminLocais/>}/>
        <Route path="/docsadmin" element={<AdminDocumentos/>}/>
        <Route path="/locais" element={<Locais/>}/>
        <Route path="/eventos" element={<Eventos/>}/> 
        <Route path ="/galeria" element={<Galeria/>}/>
        <Route path ="/espaco-cidadao" element={<EspacoCidadao/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;