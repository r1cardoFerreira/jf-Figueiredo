const SRService = require('../services/sugestoes_reclamacoes.service');

async function createSugestoes_Reclamacoes(req, res) {
    try {
      const sugestoes_reclamacoes = await SRService.createSugestoes_Reclamacoes(req.body, req.files);
      res.status(201).json(sugestoes_reclamacoes);
    } catch (error) {
      console.error("Erro ao criar Sugestao/Reclamacao:", error);
      res.status(500).json({ error: "Erro ao criar Sugestao/Reclamacao", detalhes: error.message });
    }
}


async function getAllSugestoes_Reclamacoes(req, res) {
  try {
    const sugestoes_reclamacoes = await SRService.getAllSugestoes_Reclamacoes();
    res.json(sugestoes_reclamacoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao procurar a Sugestao/Reclamacao' });
  }
}

module.exports = {
  createSugestoes_Reclamacoes,
  getAllSugestoes_Reclamacoes,
};