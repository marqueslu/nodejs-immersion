const assert = require('assert')
const MongoDb = require('../db/strategies/mongodb/mongodb')

const HeroiSchema = require('../db/strategies/mongodb/schemas/heroiSchema')

const Context = require('../db/strategies/base/contextStrategy')

const MOCK_HEROI_CADASTRAR = {
    nome: 'Mulher Maravilha',
    poder: 'Laço'
}

const MOCK_HEROI_DEFAULT = {
    nome: `Homem Aranha-${Date.now()}`,
    poder: 'Super teia'
}

const MOCK_HEROI_ATUALIZAR = {
    nome: `Patolino-${Date.now()}`,
    poder: 'Velocidade'
}

let MOCK_HEROI_ID = ''

let context = {}

describe('MongoDb Suite de testes', function () {    
    this.beforeAll(async () => {
        const connection = MongoDb.connect()
        console.log(HeroiSchema)
        context = new Context(new MongoDb(connection, HeroiSchema))
        
        await context.create(MOCK_HEROI_DEFAULT)
        const result = await context.create(MOCK_HEROI_ATUALIZAR)
        MOCK_HEROI_ID = result._id

    })
    it('verificar conexao', async function () {
        const result = await context.isConnected()
        const expected = 'Conectado'
        assert.strictEqual(result, expected)
    })
    it('cadastrar', async () => {
        const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)

        assert.deepStrictEqual({nome, poder}, MOCK_HEROI_CADASTRAR)
    })

    it('listar', async () => {
        const [{nome, poder}] = await context.read({ nome: MOCK_HEROI_DEFAULT.nome })
        
        const result = {
            nome, poder
        }

        assert.deepStrictEqual(result, MOCK_HEROI_DEFAULT)
    })

    it('atualizar', async () => {
        const result = await context.update(MOCK_HEROI_ID, {
            nome: 'Pernalonga'
        })

        assert.deepStrictEqual(result.nModified, 1)
    })

    it('remover', async () => {
        const result = await context.delete(MOCK_HEROI_ID)

        assert.deepStrictEqual(result.n, 1)
    })
   
})