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

main()
async function main() {
  try {
    console.time('medida-promise')
    const usuario = await obterUsuario()
    // const telefone = await obterTelefone(usuario.id)
    // const endereco = await obterEnderecoAsync(usuario.id)
    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id)
    ])
    const endereco = resultado[1]
    const telefone = resultado[0]
    console.log(`
      Nome: ${usuario.nome},
      Telefone: (${telefone.ddd}) ${telefone.telefone}
      Endereco: ${endereco.rua}, ${endereco.numero}
    `)
    console.timeEnd('medida-promise')
  } catch (error) {
    console.error('DEU RUIM', error)
  }
}

// const usuarioPromise = obterUsuario()

// usuarioPromise
//   .then(function (resultado) {
//     return obterTelefone(resultado.id)
//     .then(function resolverTelefone(result) {
//       return {
//         usuario: {
//           nome: resultado.nome,
//           id: resultado.id
//         },
//         telefone: result
//       }
//     })
//   })
//   .then(function (resultado) {
//     const endereco = obterEnderecoAsync(resultado.usuario.id)
//     return endereco.then(function resolverEndereco(result) {
//       return {
//         usuario: resultado.usuario,
//         telefone: resultado.telefone,
//         endereco: result
//       }
//     })
//   })
//   .then(function (resultado) {
//     console.log(`
//       Nome: ${resultado.usuario.nome}
//       Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numer}
//       telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
//     `)
//   })
//   .catch(function(error) {
//     console.log('DEU RUIM', error)
//   })



// function resolverUsuario(erro, usuario) {
//   console.log('usuario', usuario)
// }

// obterUsuario(function resolverUsuario(error, usuario) {
//   if(error) {
//     console.error('Deu ruim em usuario', error)
//     return
//   }

//   obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//     if(error1) {
//       console.error('Deu ruim em telefone', error1)
//       return
//     }

//     obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//       if(error2) {
//         console.error('Deu ruim em enderelo', error2)
//         return
//       }

//       console.log(`
//         Nome: ${usuario.nome}, 
//         Endereco: ${endereco.rua}, ${endereco.numero} 
//         Telefone: (${telefone.ddd})${telefone.telefone}`)
//     })
//   })
// })