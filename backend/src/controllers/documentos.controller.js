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
    const documentos = await documentoService.getDocumentoTipo(tipo);
    res.json(documentos);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Erro ao procurar Documentos' })
  }
}

async function deleteAssociacaoId(req, res) {
  const id = Number(req.params.id) 
  try {
    const associacoes = await Service.deleteAssociacaoId(id);
    res.json(associacoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao eleiminar Associacoes' });
  }
}

async function deleteDocumentoId(req, res) {
  const id = Number(req.params.id) 
  try{
    const documentos = await documentoService.deleteDocumentosId(id);
    res.json(documentos);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Erro ao eliminar Documento' })
  }
}


module.exports = {
  createDocumento,
  getAllDocumento,
  getDocumentoTipo,
  deleteDocumentoId,
};