const util = require('util')

const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {  
  return new Promise(function resolverPromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        id: 1,
        nome: 'Aladin',
        dataNascimento: new Date()
      })
    }, 1000)
  })  
}

function obterTelefone(idUsuario) {
  return new Promise(function resolverPromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: '119900099',
        ddd: 11
      })
    }, 2000)
  })
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'dos lobos',
      numero: 0
    })
  }, 2000)
}


const usuarioPromise = obterUsuario()

usuarioPromise
  .then(function (resultado) {
    return obterTelefone(resultado.id)
    .then(function resolverTelefone(result) {
      return {
        usuario: {
          nome: resultado.nome,
          id: resultado.id
        },
        telefone: result
      }
    })
  })
  .then(function (resultado) {
    const endereco = obterEnderecoAsync(resultado.usuario.id)
    return endereco.then(function resolverEndereco(result) {
      return {
        usuario: resultado.usuario,
        telefone: resultado.telefone,
        endereco: result
      }
    })
  })
  .then(function (resultado) {
    console.log(`
      Nome: ${resultado.usuario.nome}
      Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numer}
      telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
    `)
  })
  .catch(function(error) {
    console.log('DEU RUIM', error)
  })
