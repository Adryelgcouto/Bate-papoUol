axios.defaults.headers.common['Authorization'] = 'vqAALG1liXR0iqBfIgoFaDyx'
let mensagens = []
let nome = {
  name: ''
}

//nome do Usuario
function pedirNome() {
  const nomeDoUsuario = prompt('Qual o seu nome')
  const enviarDoUsuario = (nome.name = nomeDoUsuario)
  console.log(nome)
  const requisicao = axios
    .post('https://mock-api.driven.com.br/api/vm/uol/participants', nome)
    .then(response => {
      setInterval(MensagemServidor, 3000)
    })
  requisicao.catch(UsuarioErro)
  MensagemServidor()
}
pedirNome()
function MensagemServidor() {
  axios
    .get('https://mock-api.driven.com.br/api/vm/uol/messages')
    .then(response => {
      response.data.forEach(({ from, to, text, type, time }) => {
        const mensagem = document.querySelector('ul')
        mensagem.innerHTML += ` 
                      <li>
                      <span class="clock">${time}</span> <strong>${from}</strong> para <strong>${to}</strong>${text}
                      </li>`
      })
    })
}
function UsuarioErro(erro) {
  console.log('Deu erro')
}

function enviarMensagem() {
  const input = document.querySelector('input')
  const mensagemNova = {
    from: '',
    to: 'todos',
    text: input.value,
    type: 'message'
  }
  mensagens.push(mensagemNova)
  console.log(mensagemNova)
  // enviar uma requisição para o servidor
  const requisicao = axios.post(
    'https://mock-api.driven.com.br/api/vm/uol/messages',
    mensagemNova
  )
  requisicao.then(requisicaoFuncionou)
  requisicao.catch(requisicaoDeuErro)
  console.log(requisicao)
  console.log(mensagens)
  renderizarMensagem()
}
function requisicaoFuncionou(funcionou) {
  console.log(funcionou)
}
function requisicaoDeuErro(erro) {
  console.log(erro)
}
