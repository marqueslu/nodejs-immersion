function obterUsuario(callback) {
  setTimeout(() => {
    return callback(null, {
      id: 1,
      nome: 'Aladin',
      dataNascimento: new Date()
    })
  }, 1000)
}

function obterTelefone(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      telefone: '119900099',
      ddd: 11
    })
  }, 2000)
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'dos lobos',
      numero: 0
    })
  }, 2000)
}

function resolverUsuario(erro, usuario) {
  console.log('usuario', usuario)
}

obterUsuario(function resolverUsuario(error, usuario) {
  if(error) {
    console.error('Deu ruim em usuario', error)
    return
  }

  obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
    if(error1) {
      console.error('Deu ruim em telefone', error1)
      return
    }

    obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
      if(error2) {
        console.error('Deu ruim em enderelo', error2)
        return
      }

      console.log(`
        Nome: ${usuario.nome}, 
        Endereco: ${endereco.rua}, ${endereco.numero} 
        Telefone: (${telefone.ddd})${telefone.telefone}`)
    })
  })
})