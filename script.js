axios.defaults.headers.common['Authorization'] = 'vqAALG1liXR0iqBfIgoFaDyx'
const pedirNome = prompt('Qual o seu nome')
let mensagens = []
const promise = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages')
promise.then(receberMensagensDoServidor)
function receberMensagensDoServidor(resposta) {
  mensagens = resposta.data
  console.log(resposta)
  renderizarMensagem()
}
function renderizarMensagem() {
  const mensagem = document.querySelector('ul')
  for (let i = 0; i < mensagens.length; i++) {
    const informacoesMensagens = mensagens[i]
    mensagem.innerHTML += ` 
                      <li>
                      <span class="clock">(09:22:28)</span> <strong>${informacoesMensagens.from}</strong> para <strong>todos:</strong>${informacoesMensagens.text}
                      </li>`
  }
}
function enviarMensagem() {
  const input = document.querySelector('input')
  const mensagemNova = {
    from: pedirNome,
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
