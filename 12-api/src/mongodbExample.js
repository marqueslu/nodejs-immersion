const Mongoose = require('mongoose')

Mongoose.connect('mongodb://marks:minhasenhasecreta@localhost:27017/herois', {
    useNewUrlParser: true
}, function (error) {
    if(!error) return ;

    console.log('Falha na conexão!', error)
})

const connection = Mongoose.connection

function nomeFuncao() {

}

const minhaFuncao = function () {

}

const minhaFuncaoArrow = () => {

}

connection.once('open', () => console.log('database rodando!'))


const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    insertedAd: {
        type: Date,
        default: new Date()
    }
})

const model = Mongoose.model('herois', heroiSchema)

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    })

    console.log('result cadastrar', resultCadastrar)

    const listItens = await model.find()
    console.log('Items', listItens)
}

main()