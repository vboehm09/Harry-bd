//Lógica, tratativa de erros e regras de negocio

//importar o model
import * as BruxoModel from '../models/bruxoModels.js'

export const listarTodos = async (req, res) => {
    try {
        const bruxos = await BruxoModel.findAll();

        if (!bruxos || bruxos.length === 0) {
            res.status(404).json({
                total: bruxos.length,
                mensagem: 'Não há bruxos na lista',
                bruxos
            })
            
        }

        res.status(200).json({
            total: bruxos.length,
            mensagem: 'Lista de bruxos',
            bruxos
        })

    } catch (error) {
        res.status(500).json({
            erro: 'Erro interno de servidor',
            detalhes: error.message,
            status: 500
        })
    }
}

export const listarUm= async (req, res) => {
    try {
        const id = req.params.id;
        const bruxo =  await BruxoModel.findById(id);

        if (!bruxo) {
            return res.status(404).json({
                erro: 'Bruxo não encontrado',
                mensagem: 'Verifique se o id do bruxo existe',
                id: id
            })
        }

        res.status(200).json({
            mensagem: 'Bruxo encontrado',
            bruxo
        })


    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao buscar bruxo por id',
            detalhes: error.message
        })
    }
}

