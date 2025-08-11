const associacaoService = require('../services/associacoes.service');

async function createAssociacao(req, res) {
    try {
      const associacao = await associacaoService.createAssociacao(req.body, req.file);
      res.status(201).json(associacao);
    } catch (error) {
      console.error("Erro ao criar Evento:", error);
      res.status(500).json({ error: "Erro ao criar Associacao", detalhes: error.message });
    }
}


async function getAllAssociacao(req, res) {
  try {
    const associacoes = await associacaoService.getAllAssociacao();
    res.json(associacoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao procurar Associacoes' });
  }
}

async function getAssociacaoId(req, res) {
  const id = Number(req.params.id) 
  try {
    const associacoes = await associacaoService.getAssociacaoId(id);
    res.json(associacoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao procurar Associacoes' });
  }
}

async function deleteAssociacaoId(req, res) {
  const id = Number(req.params.id) 
  try {
    const associacoes = await associacaoService.deleteAssociacaoId(id);
    res.json(associacoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao eleiminar Associacoes' });
  }
}

async function updateAssociacao(req, res){
    const id = Number(req.params.id);
    
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ 
            error: 'Nenhum dado fornecido para atualização' 
        });
    }
    
    const dadosAtualizados = req.body;
    
    try {
        const assocAtualizado = await associacaoService.updateAssociacao(dadosAtualizados, id , req.files);
        res.json(assocAtualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Erro ao atualizar a Associacao'});
    }
}

module.exports = {
  createAssociacao,
  getAllAssociacao,
  getAssociacaoId,
  deleteAssociacaoId,
  updateAssociacao,
};