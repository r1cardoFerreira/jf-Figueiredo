const eventosService = require('../services/eventos.service');

async function createEvento(req, res) {
    console.log(req.files)
    try {
      const evento = await eventosService.createEvento(req.body, req.files);
      res.status(201).json(evento);
    } catch (error) {
      console.error("Erro ao criar Evento:", error);
      res.status(500).json({ error: "Erro ao criar Evento", detalhes: error.message });
    }
}


async function getAllEvento(req, res) {
  try {
    const eventos = await eventosService.getAllEvento();
    res.json(eventos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao procurar Eventos' });
  }
}

async function getEventoTipo(req, res) {
  const tipo = req.params.tipo 
  try{
    const eventos = await eventosService.getEventoTipo(tipo);
    res.json(eventos);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Erro ao procurar Eventos' })
  }
}

async function getEventoId(req, res) {
  const id = Number(req.params.id);
  try {
    const evento = await eventosService.getEventoId(id);
    if (!evento) {
      return res.status(404).json({ error: 'Evento não encontrado' });
    }
    res.json(evento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao procurar Evento' });
  }
}

async function updateEvento(req, res){
  const id = Number(req.params.id)
  const dadosAtualizados = req.body
  try{
    const eventoAtualizado = await eventosService.updateEvento(dadosAtualizados,id);
    res.json(eventoAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Erro ao atualizar o Evento' })
  }
}



module.exports = {
  createEvento,
  getAllEvento,
  getEventoTipo,
  updateEvento,
  getEventoId,
};