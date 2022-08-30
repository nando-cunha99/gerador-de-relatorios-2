const inputRelatório = document.querySelectorAll('input[name="relatorio"]');

const inputHora = document.querySelector('#hora');

const inputLocal = document.querySelector('#local');

const listaLocal = document.querySelector('#listaLocal');

const inputFuncionario = document.querySelector('#funcionario');

const listaFuncionario = document.querySelector('#listaFuncionario');

const inputInformação = document.querySelectorAll('#informacao');

const textbox = document.querySelector('#textbox')

const botaoGerador = document.querySelector('#gera-relatorio');

const botaoReset = document.querySelector('#botaoReset');

const divRelatorio = document.querySelector('#divRelatorio');

const tabelaRelatorio = document.querySelector('#tabelaRelatorio');

const locaisRela1 = ['Local A', 'Local B', 'Local C'];

const locaisRela2e3 = ['Local 1', 'Local 2', 'Local 3']

const locaisGiardino = ['Estabelecimento 1', 'Estabelecimento 2', 'Estabelecimento 3'];

const funcionariosRela1 = ['Michael Jordan', 'Magic Johnson', 'Dennis Rodman'];
 
const funcionariosRela2e3 = ['Lebron James','Carmelo Anthony', 'Kobe Bryant'];

const inputImagem = document.querySelector('#imagem');

textbox.disabled = true;

botaoReset.disabled = true;

//Verifica se o local tem um elemento, e se tiver retirar.
function verificaLista(elementoPai) {
	while(elementoPai.hasChildNodes()){
		elementoPai.removeChild(elementoPai.firstChild);
	}
}

//Relaciona uma lista a um input do tipo search.
function adicionaOpcao(array, elPai) {
	array.forEach((valorAtual) =>{
		let opcao = document.createElement('option');
		opcao.value = valorAtual;
		elPai.appendChild(opcao);
	})
}

//Adiciona a datalist no input dependendo do radio escolhido.
function adicionaListas(arrayRadio, lista1, lista2, espaço) {
	verificaLista(espaço);
	verificaLista(espaço);

	if(arrayRadio[0].checked !== true) {
		adicionaOpcao(lista1, espaço);
	} else {
		adicionaOpcao(lista2, espaço);
	}
}

//Habilita o textbox se o radio "Outro" estiver ativo.
function habilitaTextbox(arrayRadio) {
	if(arrayRadio.item(1).checked !== true){
		textbox.disabled = true;
	} else {
		textbox.disabled = false;
	}
}

//Habilita o botão de limpar página.
function habilitaLimpaPagina() {
    botaoReset.disabled = false;
}