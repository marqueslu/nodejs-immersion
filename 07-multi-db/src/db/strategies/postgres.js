const ICrud = require('./interfaces/iCrud')

class Postgres extends ICrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('O item foi salvo em postgres')
    }
}

module.exports = Postgres