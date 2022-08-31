const inputRelatorio = document.querySelectorAll('input[name="relatorio"]');

const inputHora = document.querySelector("#hora");

const inputLocal = document.querySelector("#local");

const listaLocal = document.querySelector("#listaLocal");

const inputFuncionario = document.querySelector("#funcionario");

const listaFuncionario = document.querySelector("#listaFuncionario");

const inputInformaçao = document.querySelectorAll('input[name="informacao"]');

const textbox = document.querySelector("#textbox");

const botaoGerador = document.querySelector("#gera-relatorio");

const botaoReset = document.querySelector("#botaoReset");

const divRelatorio = document.querySelector("#divRelatorio");

const tabelaRelatorio = document.querySelector("#tabelaRelatorio");

const locaisRela1 = ["Local A", "Local B", "Local C"];

const locaisRela2e3 = ["Local 1", "Local 2", "Local 3"];

const locaisGiardino = [
  "Estabelecimento 1",
  "Estabelecimento 2",
  "Estabelecimento 3"
];

const funcionariosRela1 = ["Michael Jordan", "Magic Johnson", "Dennis Rodman"];

const funcionariosRela2e3 = ["Lebron James", "Carmelo Anthony", "Kobe Bryant"];

const inputImagem = document.querySelector("#imagem");

textbox.disabled = true;

botaoReset.disabled = true;

//Verifica se o local tem um elemento, e se tiver retirar.
function verificaLista(elementoPai) {
  while (elementoPai.hasChildNodes()) {
    elementoPai.removeChild(elementoPai.firstChild);
  }
}

//Relaciona uma lista a um input do tipo search.
function adicionaOpcao(array, elPai) {
  array.forEach((valorAtual) => {
    let opcao = document.createElement("option");
    opcao.value = valorAtual;
    elPai.appendChild(opcao);
  });
}

//Adiciona a datalist no input dependendo do radio escolhido.
function adicionaListas(lista1, espaço1, lista2, espaço2) {
  verificaLista(espaço1);
  verificaLista(espaço2);

  adicionaOpcao(lista1, espaço1);
  adicionaOpcao(lista2, espaço2);
}

inputRelatorio[0].addEventListener("click", function () {
  adicionaListas(locaisRela1, listaLocal, funcionariosRela1, listaFuncionario);
});

inputRelatorio[1].addEventListener("click", function () {
  adicionaListas(
    locaisRela2e3,
    listaLocal,
    funcionariosRela2e3,
    listaFuncionario
  );
});

inputRelatorio[2].addEventListener("click", function () {
  adicionaListas(
    locaisRela2e3,
    listaLocal,
    funcionariosRela2e3,
    listaFuncionario
  );
});

//Habilita o textbox se o radio "Outro" estiver ativo.
function habilitaTextbox() {
  if (inputInformaçao.item(1).checked !== true) {
    textbox.disabled = true;
  } else {
    textbox.disabled = false;
  }
}

inputInformaçao[0].addEventListener("click", habilitaTextbox);

inputInformaçao[1].addEventListener("click", habilitaTextbox);

//Habilita o botão de limpar página.
function habilitaLimpaPagina() {
  botaoReset.disabled = false;
}

//Alinha o relatorio junto das informações
function montaRelatorio(
  linhaDeCima,
  header,
  linhaDeBaixo,
  dadosRelatorio,
  divDoRelatorio
) {
  divDoRelatorio.appendChild(linhaDeCima);
  linhaDeCima.appendChild(header);
  divDoRelatorio.appendChild(linhaDeBaixo);
  linhaDeBaixo.appendChild(dadosRelatorio);

  header.innerHTML = inputLocal.value;

  let reader = new FileReader();
  reader.addEventListener("load", () => {
    imagemQueRecebeOFile.src = reader.result;
    dadosRelatorio.innerHTML = inputInformaçaoValida.value;
    dadosRelatorio.appendChild(imagemQueRecebeOFile);
  });
  reader.readAsDataURL(inputImagem.files[0]);
}

//Define valor da informacao
function defineValorRelatorio(informacao, array) {
  while (informacao.value === informacao[1].value) {
    informacao.value = textbox.value;
    break;
  }

  while (informacao.value === informacao.item(0).value) {
    informacao.value = `<b>${inputHora.value}:</b> Apoio <b>${inputFuncionario.value}</b> no local que informa estar sem anormalidades.`;
    break;
  }
}

//Aparece mensagem de erro caso algum valor seja inválido
function verificaArray(array, informacao) {
  let inputsValidos = true;
  for (let contador = 0; contador < array.length; contador++) {
    if (!array[contador] || array[contador].value === "") {
      inputsValidos = false;
    }
  }
  if (!inputsValidos) {
    alert("FAVOR INSERIR DADOS VALIDOS");
  } else {
    do {
      defineValorRelatorio(informacao, array);
      console.log(informacao);
      break;
    } while (inputsValidos);
  }
}

//cria os elementos da tabela
function criaTabela() {
  let linhaDoHeader = document.createElement("tr");
  let headerNome = document.createElement("th");
  let linhaDosDaods = document.createElement("tr");
  let dadosRelatorio = document.createElement("td");
  let inputRelatorioValido = document.querySelector(
    'input[name="relatorio"]:checked'
  );
  let inputInformaçaoValida = document.querySelector(
    'input[name="informacao"]:checked'
  );

  let imagemQueRecebeOFile = document.createElement("img");
  let inputImagemFile = document.querySelector('input[type="file"]').files[0];

  let arrayComTodosInputsObrigatorios = new Array(
    inputRelatorioValido,
    inputHora,
    inputLocal,
    inputInformaçaoValida
  );

  verificaArray(arrayComTodosInputsObrigatorios, inputInformaçaoValida);
  montaRelatorio(
    linhaDoHeader,
    headerNome,
    linhaDosDaods,
    dadosRelatorio,
    tabelaRelatorio
  );
}

botaoGerador.addEventListener("click", criaTabela);