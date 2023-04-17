axios.defaults.headers.common['Authorization'] = 'vqAALG1liXR0iqBfIgoFaDyx'
let mensagens = []
let nome = {
  name: ''
}

//nome do Usuario
function pedirNome() {
  const nomeDoUsuario = prompt('Qual o seu nome')
  nome.name = nomeDoUsuario
  console.log(nome)
  const requisicao = axios
    .post('https://mock-api.driven.com.br/api/vm/uol/participants', nome)
    .then(response => {
      setInterval(MensagemServidor, 3000)
      setInterval(atualizaStatus, 5000)
    })
  requisicao.catch(UsuarioErro)
}
function atualizaStatus() {
  axios.post('https://mock-api.driven.com.br/api/vm/uol/status', nome)
  console.log('Atualizando 5s')
}
pedirNome()
function MensagemServidor() {
  const mensagem = document.querySelector('ul')
  mensagem.innerHTML = ''
  axios
    .get('https://mock-api.driven.com.br/api/vm/uol/messages')
    .then(response => {
      response.data.forEach(({ from, to, text, type, time }) => {
        const elemento = document.createElement('li')
        elemento.setAttribute('data-test', 'mensagem')
        mensagem.appendChild(elemento)
        elemento.scrollIntoView()
        elemento.innerHTML += ` 
                      <span class="clock">${time}</span> <strong>${from}</strong> para <strong>${to}</strong>${text}
                    `
      })
    })
}
function UsuarioErro(erro) {
  console.log('Deu erro')
}

function enviarMensagem() {
  const input = document.querySelector('input')
  const mensagemNova = {
    from: nome.name,
    to: 'Todos',
    text: input.value,
    type: 'message'
  }
  console.log(mensagemNova)
  // enviar uma requisição para o servidor
  const requisicao = axios
    .post('https://mock-api.driven.com.br/api/vm/uol/messages', mensagemNova)
    .then(response => {
      console.log('certo')
    })
}
function requisicaoFuncionou(funcionou) {
  console.log(funcionou)
}
function requisicaoDeuErro(erro) {
  console.log(erro)
}
