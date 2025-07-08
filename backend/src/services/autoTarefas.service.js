const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cron = require('node-cron');
const {deleteEventoId, updateEvento} = require('./eventos.service');
const {deleteSugestoes_ReclamacoesId} = require('./sugestoes_reclamacoes.service');
const {deleteDocumentosId} = require('./documentos.service');

async function delSRAntigos()
{
    const dataLimite = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000); 
    const SRAntigos = await prisma.sugestoes_reclamacoes.findMany({
        where: {
            data_CSR: {
            lt: dataLimite,
            },
        },
    });

    if (SRAntigos.length === 0) return;
    
    for(const SR of SRAntigos)
    {
        await deleteSugestoes_ReclamacoesId(SR.id)
    }
}

async function delPatchEventos() {
  const dataLimiteDel = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000); 
  const dataLimitePatch = new Date(); 

  const eventosDelPatch = await prisma.eventos.findMany({
    where: {
      data_E: {
        lt: dataLimitePatch,
      },
    },
  });

  if (eventosDelPatch.length === 0) return;

    for (const evento of eventosDelPatch) {

      if (evento.data_E < dataLimiteDel) {
        await deleteEventoId(evento.id); 
      } 
      if (evento.estado === 'ativo') {
        await updateEvento({ estado: 'inativo' }, evento.id); 
      }

    }

}

async function delDocumentos()
{
    const umMes = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); 
    const seisMeses = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000); 

    const documentosAntigos = await prisma.documentos.findMany({
        where: {
            OR: [
                {
                    AND: [
                        { tipo: { in: ['atas', 'plano_de_atividades', 'avisos', 'editais'] } },
                        { createdAt: { lt: umMes } }
                    ]
                },
                {
                    AND: [
                        { tipo: { in: ['regulamentos', 'relatorios_de_contas','outro'] } },
                        { createdAt: { lt: seisMeses } }
                    ]
                }
            ]
        }
    });

    if (documentosAntigos.length === 0) return;

    for(const documento of documentosAntigos)
    {
        await deleteDocumentosId(documento.id)
    }

  
}



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
    
   
