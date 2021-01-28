const commander = require('commander');
const Heroi = require('./heroi');
const Database = require('./database');


(async () =>  {
    commander
        .version('v1')
        .option('-n, --nome [value]', 'Nome do Heroi')
        .option('-p, --poder [value]', "Poder do Heroi")
        .option('-i, --id [value]', 'Id do Heroi')

        .option('-c, --cadastrar', 'Cadastrar um heroi')
        .option('-l, --listar', 'Listar um heroi')
        .option('-r, --remover', 'Remover um heroi pelo id')
        .option('-a, --atualizar [value]', 'Atualizar um heroi pelo id')
        .parse(process.argv);

    const heroi = new Heroi(commander)

    try {
        if(commander.cadastrar) {
            delete heroi.id

            const resultado = await Database.cadastrar(heroi)

            if(!resultado) {
                console.error('Heroi não foi cadastrado!')
                return;
            } else {
                console.log("Heroi cadastrado com sucesso!")
            }
         }

         if(commander.listar) {
             const resultado = await Database.listar()
             console.log(resultado)
             return;
         }

         if(commander.remover) {
             const resultado = await Database.remover(heroi.id)

             if(!resultado) {
                 console.error('Não foi possível remover o heroi')
                 return;
             }

             console.log('Heroi removido com sucesso!')
         }

         if(commander.atualizar) {
            const idParaAtualizar = parseInt(commander.atualizar)
            delete heroi.id

            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado)

            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar)

            if(!resultado) {
                console.error('Não foi possível atualizar o heroi!')
                return
            } 

            console.log('Heroi atualizado com sucesso!')
         }
    } catch (error) {
        console.error('DEU RUIM', error)
    }
})()