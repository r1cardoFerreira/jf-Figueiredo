-- CreateEnum
CREATE TYPE "tipo_E" AS ENUM ('outro', 'desporto', 'cultura', 'festividades');

-- CreateEnum
CREATE TYPE "tipo_D" AS ENUM ('Atas', 'Plano_de_Atividades', 'Avisos', 'Editais', 'Regulamentos', 'Relatorios_de_contas', 'outro');

-- CreateEnum
CREATE TYPE "estado" AS ENUM ('ativo', 'inativo');

-- CreateTable
CREATE TABLE "eventos" (
    "id" SERIAL NOT NULL,
    "data_CE" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "titulo_E" VARCHAR(255) NOT NULL,
    "texto_E" VARCHAR(255),
    "tipo_E" "tipo_E" NOT NULL DEFAULT 'outro',
    "data_E" TIMESTAMP(3),
    "img_E" VARCHAR(255),
    "estado" "estado" NOT NULL DEFAULT 'ativo',

    CONSTRAINT "eventos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "associacoes" (
    "id" SERIAL NOT NULL,
    "nome_A" VARCHAR(255) NOT NULL,
    "texto_A" VARCHAR(255),
    "img_A" VARCHAR(255),

    CONSTRAINT "associacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentos" (
    "id" SERIAL NOT NULL,
    "data_CE" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "doc" VARCHAR(255) NOT NULL,
    "tipo_D" "tipo_D" NOT NULL DEFAULT 'outro',

    CONSTRAINT "documentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sugestoes_reclamacoes" (
    "id" SERIAL NOT NULL,
    "nome_SR" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "assunto" VARCHAR(255),
    "mensagem" VARCHAR(255),
    "data_CSR" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sugestoes_reclamacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "galeria" (
    "id" SERIAL NOT NULL,
    "label_G" VARCHAR(255),
    "img_E" VARCHAR(255) NOT NULL,
    "data_CG" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "galeria_pkey" PRIMARY KEY ("id")
);
