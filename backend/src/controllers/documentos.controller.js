const documentoService = require('../services/documentos.service');

async function createDocumento(req, res) {
    try {
      const documento = await documentoService.createDocumento(req.body, req.files);
      res.status(201).json(documento);
    } catch (error) {
      console.error("Erro ao criar Evento:", error);
      res.status(500).json({ error: "Erro ao criar Documento", detalhes: error.message });
    }
}


async function getAllDocumento(req, res) {
  try {
    const documentos = await documentoService.getAllDocumento();
    res.json(documentos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao procurar Documentos' });
  }
}

async function getDocumentoTipo(req, res) {
  const tipo = req.params.tipo 
  try{
    const documentos = await associacaoService.getDocumentoTipo(tipo);
    res.json(documentos);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Erro ao procurar Documentos' })
  }
}


module.exports = {
  createDocumento,
  getAllDocumento,
  getDocumentoTipo,
};