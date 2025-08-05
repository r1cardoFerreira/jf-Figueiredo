const locaisService = require('../services/locais.service');

async function createLocal(req, res) {
  try {
    const data = {
      nome_L: req.body.nome_L,
      texto_L: req.body.texto_L,
      tipo_L: req.body.tipo_L,
      estado: req.body.estado,
      latitude: req.body.latitude ? parseFloat(req.body.latitude) : null,
      longitude: req.body.longitude ? parseFloat(req.body.longitude) : null,
    };

    //console.log(req.files);

    const local = await locaisService.createLocal(data, req.files);
    res.status(201).json(local);
  } catch (error) {
    console.error("Erro ao criar local:", error);
    res.status(500).json({
      error: "Erro ao criar local",
      detalhes: error.message,
      
    });
  }
}


async function getAllLocais(req, res) {
  try {
    const locais = await locaisService.getAllLocais();
    res.json(locais);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao procurar locais' });
  }
}

async function getLocais(req, res) {
  const { tipo } = req.query;

  try {
    const locais = await locaisService.getLocais({ tipo });
    res.json(locais);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao procurar locais' });
  }
}

/*
async function getLocaisTipo(req, res) {
  const tipo = req.params.tipo 
  try{
    const locais = await locaisService.getLocaisTipo(tipo);
    res.json(locais);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Erro ao procurar Locais' })
  }
} */

async function getLocalId(req, res) {
  const id = Number(req.params.id);
  try {
    const local = await locaisService.getLocalId(id);
    if (!local) {
      return res.status(404).json({ error: 'local não encontrado' });
    }
    res.json(local);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao procurar local' });
  }
}

async function deleteLocalId(req, res) {
  const id = Number(req.params.id) 
  try {
    const local = await locaisService.deleteLocalId(id);
    res.json(local);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao eliminar Local' });
  }
}

async function updateLocal(req, res){
    const id = Number(req.params.id);
    
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ 
            error: 'Nenhum dado fornecido para atualização' 
        });
    }
    
    const dadosAtualizados = req.body;
    
    try {
        const localAtualizado = await locaisService.updateLocal(dadosAtualizados, id , req.files);
        res.json(localAtualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Erro ao atualizar o local'});
    }
}


module.exports = {
  createLocal,
  getAllLocais,
  //getLocaisTipo,
  getLocais,
  getLocalId,
  updateLocal,
  deleteLocalId,
};