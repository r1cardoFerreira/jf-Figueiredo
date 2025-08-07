const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const uploads = require('./media.service');
const email= require('../utils/mails')
const path = require('path')

async function createSugestoes_Reclamacoes(dados, files) {
    const sugestoes_reclamacoes = await prisma.sugestoes_reclamacoes.create({ 
        data:{ 
            nome_SR: dados.nome_SR,
            email: dados.email,
            assunto: dados.assunto,
            mensagem: dados.mensagem,
        }
      });
   const dadosHtml = { nome: sugestoes_reclamacoes.nome_SR, email: sugestoes_reclamacoes.email, assunto: sugestoes_reclamacoes.assunto, mensagem: sugestoes_reclamacoes.mensagem}
  

    const anexos = (files ?? []).map(file => ({
        filename: file.originalname,
        path: path.join(__dirname, '..', '..', 'uploads', file.filename)
    }));

    
    await email.enviarEmail({
        subject:sugestoes_reclamacoes.assunto, 
        text:sugestoes_reclamacoes.mensagem,
        html: email.gerarHtmlEmail(dadosHtml),
        attachments:anexos
    }) 

    return sugestoes_reclamacoes;
}

async function getAllSugestoes_Reclamacoes() {
    return prisma.sugestoes_reclamacoes.findMany({
        include: { media: true }
    });
}

async function deleteSugestoes_ReclamacoesId(id) {
    const resposta = await prisma.sugestoes_reclamacoes.delete({
        where: { id: id },
    });

    await prisma.media.deleteMany({
        where: {sugestoes_reclamacoesId: id}
    })

    return resposta;
}


module.exports = {getAllSugestoes_Reclamacoes, createSugestoes_Reclamacoes, deleteSugestoes_ReclamacoesId};