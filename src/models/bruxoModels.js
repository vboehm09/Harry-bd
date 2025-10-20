//é no models que fazemos a consulta para o banco de dados 
//ex: SELECT * FROM bruxos; porém estamos usando o PRISMA 
//que abstrai o comando SQL

//Importar o prisma client
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//Crio a variavel findAll e já exporto
export const findAll = async () => {
    //SELECT * FROM bruxos = findMany
    return await prisma.bruxo.findMany({
        orderBy: { nome: 'asc' }
    })
}

//Crio a variavel findById e já exporto
export const findById = async (id) => {
    //SELECT * FROM bruxos WHERE id = {id} = findUnique
    return await prisma.bruxo.findUnique({
        where: { id: Number(id) }
    })
}