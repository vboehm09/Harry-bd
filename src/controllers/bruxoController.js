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

export const criar = async (req, res) => {
    try {
        const { nome, casa, patrono, varinha, anoMatricula } = req.body

        const dado = req.body

        // Validação 
        const camposObrigatorios = ['nome', 'casa', 'varinha', 'anoMatricula'];

        const faltando = camposObrigatorios.filter(campo => !dado[campo]);

        if (faltando.length > 0) {
            return res.status(400).json({
                erro: `Os seguintes campos são obrigatórios: ${faltando.join(', ')}.`
            });
        }

        //Verificar se a casa é valida
        const casasValidas = ['Grifnória', 'Sonserina', 'Corvinal', 'Lufa-Lufa'];

        if (!casasValidas.includes(casasValidas)) {
            return res.status(400).json({
                erro: `Casa inválida`,
                casasValidas
            });
        }

        const novoBruxo = await BruxoModel.create(dado);

        res.status(201).json({
            mensagem: 'Bruxo criado com sucesso!',
            bruxo: novoBruxo
        })

    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao criar bruxo',
            detalhes: error.message
        })
    }
}

export const apagar = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const bruxoExiste = await BruxoModel.findById(id);

        if (!bruxoExiste) {
            return res.status(404).json({
                erro: 'Bruxo não encontrado com esse id',
                id: id
            })
        }

        await BruxoModel.deleteBruxo(id)

        res.status(200).json({
            mensagem: 'Bruxo removido com sucesso',
            bruxoRemovido: bruxoExiste
        })

    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao apagar bruxo!',
            detalhes: error.message
        })
    }
}

export const atualizar = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const dados = req.body;

        const bruxoExiste = await BruxoModel.findById(id);

        if (!bruxoExiste) {
            return res.status(404).json({
                erro: 'Bruxo não encontrado com esse id',
                id: id
            })
        }
    if (dados.casa) {
        const casasValidas = ['Grifnória', 'Sonserina', 'Corvinal', 'Lufa-Lufa'];
        if (!casasValidas.includes(casas)) {
            return res.status(400).json({
                erro: 'Casa inválida!',
                casasValidas
            })
        }
    }

        const bruxoAtualizado = await BruxoModel.update(id, dados);

        res.status(200).json({
            mensagem: 'Bruxo atualizado com sucesso',
            bruxo: bruxoAtualizado
        })


    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao atualizar bruxos',
            detalhes: error.message
        })
    }
}