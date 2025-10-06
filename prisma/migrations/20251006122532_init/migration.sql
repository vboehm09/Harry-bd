-- CreateTable
CREATE TABLE "bruxos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "casa" TEXT NOT NULL,
    "patrono" TEXT,
    "varinha" TEXT NOT NULL,
    "anoMatricula" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bruxos_pkey" PRIMARY KEY ("id")
);
