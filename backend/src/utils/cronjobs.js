const cron = require('node-cron');
const { delSRAntigos, delPatchEventos, delDocumentos } = require('../services/autoTarefas.service');

//########################################//
cron.schedule('56 * * * *', async () => {

  console.log("cron executou")
  try {
    await delSRAntigos();
    console.log("delSR executou")
  } catch (err) {
    console.error('[CRON] Erro ao remover sugestões/reclamações:', err.message);
  }

  try {
    console.log("deleventos executou")
    await delPatchEventos();
  } catch (err) {
    console.error('[CRON] Erro ao atualizar/remover eventos:', err.message);
  }

  try {
    console.log("deldocs executou")
    await delDocumentos();
  } catch (err) {
    console.error('[CRON] Erro ao apagar documentos:', err.message);
  }

});
//########################################//
    