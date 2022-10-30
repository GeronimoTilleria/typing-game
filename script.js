// todas nuestros textos de ejemplo
const textos = [
  'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
  'There is nothing more deceptive than an obvious fact.',
  'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
  'I never make exceptions. An exception disproves the rule.',
  'What one man can invent another can discover.',
  'Nothing clears up a case so much as stating it to another person.',
  'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];

// almacena la lista de palabras y el índice de la palabra que el jugador está escribiendo actualmente
let palabras = [];
let palabraIndice = 0;

// la hora de inicio
let startTime = Date.now();

// elementos de la pagina
const textoApertura = document.getElementById('mensaje-apertura');
const textoElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('texto-tipeado');
const botonInicio = document.getElementById('inicio');
const contenedorBotones = document.getElementById('btn-secundarios');
const botonNuevo = document.getElementById('nuevo');
const botonSalir = document.getElementById('salir');

botonInicio.addEventListener('click', () => {
  textoApertura.style.display = 'none';
  //Mostramos el input
  typedValueElement.style.display = 'block';
  //Mostramos los botones secundarios
  contenedorBotones.style.display = 'flex'
  //Sacamos el boton
  botonInicio.style.display = 'none';
  
  inicializarJuego();

  // Establecemos el manejador de eventos
  
  
});

typedValueElement.addEventListener('input', () => {
  // tomamos la palabra actual
  const currentWord = palabras[palabraIndice];
  // tomamos el valor actual
  const typedValue = typedValueElement.value;
  if (typedValue === currentWord && palabraIndice === palabras.length - 1) {
    // fin de la sentencia
    // Definimos el mensaje de éxito
    const elapsedTime = new Date().getTime() - startTime;
    const message = `FELICITACIONES! Finalizaste en ${Math.floor(elapsedTime / 1000)} segundos.`;
    messageElement.innerText = message;
    typedValueElement.style.display = 'none';
    textoElement.childNodes[palabraIndice].className = '';
  } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
    // fin de la palabra
    // vaciamos el valor typedValueElement para la siguiente palabra
    typedValueElement.value = '';
    // movemos a la palabra siguiente
    palabraIndice++;
    // reiniciamos el estado de todas las clases para los textos
    for (const palabraElement of textoElement.childNodes) {
      palabraElement.className = '';
    }
    // resaltamos la palabra actual
    textoElement.childNodes[palabraIndice].className = 'highlight';
  } else if (currentWord.startsWith(typedValue)) {
    // correcta actual
    // resaltar la siguiente palabra
    typedValueElement.className = '';
  } else {
    // estado error
    typedValueElement.className = 'error';
  }
});

botonNuevo.addEventListener('click', () => {
  inicializarJuego();
});

botonSalir.addEventListener('click', () => {
  textoApertura.style.display = 'block';
  typedValueElement.style.display = 'none';
  contenedorBotones.style.display = 'none';
  botonInicio.style.display = 'block';
  textoElement.innerHTML = '';
  messageElement.innerText = '';
});

function inicializarJuego() {
  // elegimos el texto de ejemplo a mostrar
  const textoIndice = Math.floor(Math.random() * textos.length);
  const texto = textos[textoIndice];
  // separamos el texto en un array de palabras
  palabras = texto.split(' ');
  // reestablemos el indice de palabras para el seguimiento
  palabraIndice = 0;

  // Actualizamos la interfaz de usuario
  // Creamos una matriz con los elementos span de nuestro HTML para poder definirles una class
  const spanPalabras = palabras.map(function (palabra) { return `<span>${palabra} </span>` });
  // Convertimos a string y lo definimos como innerHTML en el texto de ejemplo a mostrar
  textoElement.innerHTML = spanPalabras.join('');
  // Resaltamos la primer palabra
  textoElement.childNodes[0].className = 'highlight';
  // Borramos los mensajes previos
  messageElement.innerText = '';

  // Definimos el elemento textbox
  // Vaciamos el elemento textbox
  typedValueElement.value = '';
  // Definimos el foco en el elemento
  typedValueElement.focus();

  // Iniciamos el contador de tiempo
  startTime = new Date().getTime();
}



