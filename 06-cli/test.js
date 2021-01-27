const {
    deepStrictEqual,
    ok,
    deepEqual
} = require('assert')

const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash', 
    poder: 'Speed', 
    id: 1
}

const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Lanterna Verde',
    poder: 'Energia do Anel',
    id: 2

}

describe('Suite de manipulação de Herois', () => {
    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
    })

    it('deve pesquisar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const [resultado] = await database.listar(expected.id)

        deepStrictEqual(resultado, expected)
    })

    it('deve cadastrar um hero, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)        
        const [atual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)

        deepStrictEqual(atual, expected)
    })

    it('deve remover um heroi por id', async () => {
        const expected = true
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)
        deepStrictEqual(resultado, expected)
    })

    it('deve atualizar um heroi pelo id', async () => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'Batman',
            poder: 'Dinheiro'
        }

        const novoDado = {
            nome: 'Batman',
            poder: 'Dinheiro'
        }

        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)
        const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)

        deepStrictEqual(resultado, expected)
    })
})