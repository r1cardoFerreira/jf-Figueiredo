const cron = require('node-cron');
const { delSRAntigos, delPatchEventos, delDocumentos } = require('../services/autoTarefas.service');

//########################################//
cron.schedule('0 0 1 * *', async () => {

  try {
    await delSRAntigos();
  } catch (err) {
    console.error('[CRON] Erro ao remover sugestões/reclamações:', err.message);
  }

  try {
    await delPatchEventos();
  } catch (err) {
    console.error('[CRON] Erro ao atualizar/remover eventos:', err.message);
  }

  try {
    await delDocumentos();
  } catch (err) {
    console.error('[CRON] Erro ao apagar documentos:', err.message);
  }

});
//########################################//
    