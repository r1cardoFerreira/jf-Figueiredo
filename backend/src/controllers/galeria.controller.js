const galeriaService = require('../services/galeria.service');

async function createGaleria(req, res) {
    try {
      const galeria = await galeriaService.createGaleria(req.body, req.files);
      res.status(201).json(galeria);
    } catch (error) {
      console.error("Erro ao criar imagem de alegria:", error);
      res.status(500).json({ error: "Erro ao criar imagem de alegria", detalhes: error.message });
    }
}


async function getAllGaleria(req, res) {
  try {
    const galeria = await galeriaService.getAllGaleria();
    res.json(galeria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao procurar a Galeria' });
  }
}

/*
async function getDelGaleria(req, res) {
  try {
    const galeria = await galeriaService.getAllGaleria();
    res.json(galeria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao procurar a Galeria' });
  }
}*/

async function deleteGaleriaId(req, res) {
  const id = Number(req.params.id) 
  try {
    const galeria = await galeriaService.deleteGaleriaId(id);
    res.json(galeria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao eliminar elemento na Galeria' });
  }
}

module.exports = {
  createGaleria,
  getAllGaleria,
  //getDelGaleria,
  deleteGaleriaId,
};