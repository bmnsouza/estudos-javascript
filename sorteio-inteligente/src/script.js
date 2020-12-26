// Obtém os valores armazenados no localStorage.
let limiteStorage = localStorage.getItem('limiteStorage') ? JSON.parse(localStorage.getItem('limiteStorage')) : ''
localStorage.setItem('limiteStorage', JSON.stringify(limiteStorage))
let numerosStorage = localStorage.getItem('numerosStorage') ? JSON.parse(localStorage.getItem('numerosStorage')) : []
localStorage.setItem('numerosStorage', JSON.stringify(numerosStorage))


// Obtém os elementos da página index.html.
const limite = document.getElementById('limite')
let btnApagar = document.getElementById('btnApagar')
let secaoNumerosSorteados = document.getElementById('secaoNumerosSorteados')
let ultimoNumeroSorteado = document.getElementById('ultimoNumeroSorteado')
let numerosSorteados = document.getElementById('numerosSorteados')


// Função responsável por Limpar o campo Limite, ocultar o botão Apagar e a seção dos números sorteados.
function ocultarNumerosSorteados() {
  limite.value = ''
  btnApagar.style.visibility = 'hidden'
  secaoNumerosSorteados.style.display = 'none'
}


// Todas as vezes que a página index.html é carregada, obtém os valores armazenados no localStorage para mantê-la atualizada.
if (numerosStorage.length > 0) {
  limite.value = limiteStorage
  ultimoNumeroSorteado.innerHTML = numerosStorage.slice(-1)

  // Lógica criada para permitir até 5 números sorteados por linha.
  for (let i = 0; i < numerosStorage.length; i++) {
    if ((i != 0) && (i % 5 == 0)) {
      numerosSorteados.innerHTML += `<br>${numerosStorage[i]}`
    } else {
      if (i == 0) {
        numerosSorteados.innerHTML += numerosStorage[i]
      } else {
        numerosSorteados.innerHTML += ` - ${numerosStorage[i]}`
      }
    }
  }
} else {
  ocultarNumerosSorteados()
}


// Função responsável por realizar o sorteio.
function realizarSorteio() {
  // Verifica se a quantidade de números sorteados já alcançou o limite informado.
  if (numerosStorage.length >= limite.value) {
    alert(`O sorteio já alcançou o limite de números sorteados (${Number(limite.value)}). Para continuar aumente o limite.`)
    return false
  } else {
    // Gera um número aleatório de 1 até o limite informado.
    let numeroSorteado = Math.floor(Math.random() * limite.value + 1)

    /* Verifica se o número gerado ainda não existe no array do sorteio antes de armazená-lo. 
     * Se já existir, chama a função realizarSorteio() até encontrar um número que ainda não foi sorteado. */
    if (numerosStorage.indexOf(numeroSorteado) < 0) {
      // Armazena o valor do limite informado.
      localStorage.setItem('limiteStorage', Number(limite.value))

      // Armazena o novo número gerado.
      numerosStorage.push(numeroSorteado)
      localStorage.setItem('numerosStorage', JSON.stringify(numerosStorage))
    } else {
      // Chamada recursiva para gerar um número aleatório por que o anterior é repetido.
      realizarSorteio()
    }
  }
}


// Função responsável por apagar os dados do sorteio.
function apagarSorteio() {
  let resposta = confirm('Deseja apagar as informações do sorteio?')

  if (resposta) {
    localStorage.clear()
    numerosStorage = []
    ocultarNumerosSorteados()
  }
}