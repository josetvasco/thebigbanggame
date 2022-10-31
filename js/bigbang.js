const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonPersonajeJugador = document.getElementById('boton-personaje')
const botonReiniciar = document.getElementById('boton-reiniciar')
const spanResultadoAtaque = document.getElementById('resultado-ataque')

const sectionSeleccionarPersonaje = document.getElementById('seleccionar-personaje')   
const spanPersonajeJugador = document.getElementById('personaje-jugador')
const spanPersonajeEnemigo = document.getElementById('personaje-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas =document.getElementById('contenedor-tarjetas')
const contenedorAtaques = document.getElementById('contenedor-ataques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let personajes = []
let personajesEnemigos = []
let ataqueJugador
let resultadoAtaque
let ataqueEnemigo
let opcionDePersonajes
let inputSheldon
let inputLeonard
let inputPenny
let inputHoward
let inputRaj
let inputAmy
let inputStuart
let inputBernadette
let botonPiedra
let botonPapel
let botonTijera
let botonLagarto
let botonSpock
let personajeDelJugadorObjeto
let personajeJugador
let ataquesPersonaje
let ataquesPersonajeEnemigo
let botones = []
let vidasJugador = 5
let vidasEnemigo = 5
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = 'img/mapa.jpg'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 400

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 650 / 850

mapa.width = anchoDelMapa 
mapa.height = alturaQueBuscamos

class Personaje {
    constructor(nombre, imagen, vida, x = 170, y = 135) {
        this.nombre = nombre
        this.imagen = imagen
        this.vida = vida
        this.ataques = []
        this.alto = 35
        this.ancho = 45
        this.x = x
        this.y = y
        this.mapaFoto = new Image()
        this.mapaFoto.src = imagen
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarPersonaje() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.alto,
            this.ancho,
        )        
    }
}

let sheldon = new Personaje ( 'Sheldon', 'img/Sheldon.png', 5)
let leonard  = new Personaje ('Leonard', 'img/Leonard.png', 5) 
let penny = new Personaje ('Penny', 'img/Penny.png' , 5)
let howard = new Personaje ('Howard', 'img/Howard.png', 5) 
let raj = new Personaje ('Raj', 'img/Rajesh.png', 5)
let amy = new Personaje ('Amy', 'img/Amy.png', 5)
let stuart = new Personaje ('Stuart', 'img/Stuart.png', 5)
let bernadette = new Personaje ('Bernadette', 'img/Bernadette.png', 5)

let sheldonEnemigo = new Personaje ( 'Sheldon', 'img/Sheldon.png', 5, 50, 50)
let leonardEnemigo  = new Personaje ('Leonard', 'img/Leonard.png', 5, 175, 50)
let pennyEnemigo = new Personaje ('Penny', 'img/Penny.png', 5, 300, 35)
let howardEnemigo = new Personaje ('Howard', 'img/Howard.png', 5, 50, 200)
let rajEnemigo = new Personaje ('Raj', 'img/Rajesh.png', 5, 300, 200)
let amyEnemigo = new Personaje ('Amy', 'img/Amy.png', 5, 280, 110)
let stuartEnemigo = new Personaje ('Stuart', 'img/Stuart.png', 5, 180, 200)
let bernadetteEnemigo = new Personaje ('Bernadette', 'img/Bernadette.png', 5, 80, 115)

const ataqueDePersonajes = [
    { nombre: 'PIEDRA', id: 'boton-piedra' , imagen: 'img/Piedra.png' },
    { nombre: 'PAPEL', id: 'boton-papel', imagen: 'img/Papel.png' },
    { nombre: 'TIJERA', id: 'boton-tijera', imagen: 'img/Tijeras.png' },
    { nombre: 'LAGARTO', id: 'boton-lagarto', imagen: 'img/Lagarto.png' },
    { nombre: 'SPOCK', id: 'boton-spock', imagen: 'img/Spock.png' },
]

sheldon.ataques.push(...ataqueDePersonajes)
sheldonEnemigo.ataques.push(...ataqueDePersonajes)

leonard.ataques.push(...ataqueDePersonajes)
leonardEnemigo.ataques.push(...ataqueDePersonajes)

penny.ataques.push(...ataqueDePersonajes)
pennyEnemigo.ataques.push(...ataqueDePersonajes)

howard.ataques.push(...ataqueDePersonajes)
howardEnemigo.ataques.push(...ataqueDePersonajes)

raj.ataques.push(...ataqueDePersonajes)
rajEnemigo.ataques.push(...ataqueDePersonajes)

amy.ataques.push(...ataqueDePersonajes)
amyEnemigo.ataques.push(...ataqueDePersonajes)

stuart.ataques.push(...ataqueDePersonajes)
stuartEnemigo.ataques.push(...ataqueDePersonajes)

bernadette.ataques.push(...ataqueDePersonajes)
bernadetteEnemigo.ataques.push(...ataqueDePersonajes)

personajes.push(sheldon, leonard, penny, howard, raj, amy, stuart, bernadette)

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    personajes.forEach((personaje) => {
        opcionDePersonajes = `
        <input type="radio" name="personaje" id="${personaje.nombre}" />
        <label class="tarjeta-de-personajes" for="${personaje.nombre}" >
            <p>${personaje.nombre}</p>
            <img src="${personaje.imagen}" alt="${personaje.nombre}" />
        </label>
        `       
        contenedorTarjetas.innerHTML += opcionDePersonajes
    
        inputSheldon = document.getElementById('Sheldon')
        inputLeonard = document.getElementById('Leonard')
        inputPenny = document.getElementById('Penny')
        inputHoward = document.getElementById('Howard')
        inputRaj = document.getElementById('Raj')
        inputAmy = document.getElementById('Amy')
        inputStuart = document.getElementById('Stuart')
        inputBernadette = document.getElementById('Bernadette')
    })
    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarPersonajeJugador() { 
    if ( inputSheldon.checked ) {
        spanPersonajeJugador.innerHTML = inputSheldon.id
        personajeJugador = inputSheldon.id
    } else if ( inputLeonard.checked ) {
        spanPersonajeJugador.innerHTML = inputLeonard.id
        personajeJugador = inputLeonard.id
    } else if ( inputPenny.checked ){
        spanPersonajeJugador.innerHTML = inputPenny.id
        personajeJugador = inputPenny.id
    } else if ( inputHoward.checked ){
        spanPersonajeJugador.innerHTML = inputHoward.id
        personajeJugador = inputHoward.id
    } else if (inputRaj.checked ){
        spanPersonajeJugador.innerHTML = inputRaj.id
        personajeJugador = inputRaj.id
    } else if ( inputAmy.checked ){
        spanPersonajeJugador.innerHTML = inputAmy.id
        personajeJugador = inputAmy.id
    } else if ( inputStuart.checked ){
        spanPersonajeJugador.innerHTML = inputStuart.id
        personajeJugador = inputStuart.id
    } else if ( inputBernadette.checked ){
        spanPersonajeJugador.innerHTML = inputBernadette.id
        personajeJugador = inputBernadette.id
    } else {
        alert('Debes elegir un personaje')
        return
    }

    sectionSeleccionarPersonaje.style.display = 'none'

    extraerAtaques(personajeJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa() 
}

function extraerAtaques(personajeJugador) {
    let ataques

    for (let i = 0; i < personajes.length; i++) {
        if( personajeJugador === personajes[i].nombre ){
            ataques = personajes[i].ataques
        }    
    }
    mostrarAtaques(ataques)
} 

function mostrarAtaques(ataques) {
    ataques.forEach( (ataque) => {
        ataquesPersonaje = `
        <button id=${ataque.id} class="boton-de-ataque boton-ataques" ><img src=${ataque.imagen} alt=${ataque.nombre} /> </button>
        `
        contenedorAtaques.innerHTML += ataquesPersonaje;
    })

    botonPiedra = document.getElementById('boton-piedra')
    botonPapel = document.getElementById('boton-papel')
    botonTijera = document.getElementById('boton-tijera')
    botonLagarto = document.getElementById('boton-lagarto')
    botonSpock = document.getElementById('boton-spock')
    botones = document.querySelectorAll('.boton-ataques')

    botonPiedra.addEventListener('click', ataquePiedra)
    botonPapel.addEventListener('click', ataquePapel)
    botonTijera.addEventListener('click', ataqueTijera)
    botonLagarto.addEventListener('click', ataqueLagarto)
    botonSpock.addEventListener('click', ataqueSpock)
}

function seleccionarPersonajeEnemigo(enemigo) {
    spanPersonajeEnemigo.innerHTML = enemigo.nombre
    ataquesPersonajeEnemigo = enemigo.ataques
}

function ataquePiedra() {
    ataqueJugador = 'PIEDRA'
    ataqueAleatorioEnemigo()   
}

function ataquePapel() {
    ataqueJugador = 'PAPEL'
    ataqueAleatorioEnemigo()
}

function ataqueTijera() {
    ataqueJugador = 'TIJERA'
    ataqueAleatorioEnemigo()
}

function ataqueLagarto() {
    ataqueJugador = 'LAGARTO'
    ataqueAleatorioEnemigo()
}

function ataqueSpock() {
    ataqueJugador = 'SPOCK'
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesPersonajeEnemigo.length - 1)

    if (ataqueAleatorio == 0) {
        ataqueEnemigo = 'PIEDRA'
    } else if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'PAPEL'
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'TIJERA';
    } else if (ataqueAleatorio == 3) {
        ataqueEnemigo = 'LAGARTO'
    } else {
        ataqueEnemigo = 'SPOCK'
    }

    combate()
}

function combate() {
    console.log("ataqueEnemigo: ",ataqueEnemigo)
    console.log('ataqueJugador: ', ataqueJugador)

    if( ataqueEnemigo == ataqueJugador ) {
        resultadoAtaque = '➖'
        crearMensaje('EMPATE')
    } else if( ataqueJugador == 'TIJERA' && ataqueEnemigo == 'PAPEL' || ataqueJugador == 'PAPEL' && ataqueEnemigo == 'PIEDRA' || ataqueJugador == 'PIEDRA' && ataqueEnemigo == 'LAGARTO' || ataqueJugador == 'LAGARTO' && ataqueEnemigo == 'SPOCK' || ataqueJugador == 'SPOCK' && ataqueEnemigo == 'TIJERA' || ataqueJugador == 'TIJERA' && ataqueEnemigo == 'LAGARTO' || ataqueJugador == 'LAGARTO' && ataqueEnemigo == 'PAPEL' || ataqueJugador == 'PAPEL' && ataqueEnemigo == 'SPOCK' || ataqueJugador == 'SPOCK' && ataqueEnemigo == 'PIEDRA' || ataqueJugador == 'PIEDRA' && ataqueEnemigo == 'TIJERA' ) {
        resultadoAtaque = '✔'
        crearMensaje('GANASTE')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        resultadoAtaque = '❌' 
        crearMensaje('PERDISTE')
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }
    revisarVidas()
}

function revisarVidas() {
    if ( vidasEnemigo == 0 ) {
        crearMensajeFinal('FELICITACIONES, Ganaste!!')
        
    } else if ( vidasJugador == 0 ) {
        crearMensajeFinal('LO SIENTO, perdiste!!')
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')
    let nuevoResultadoDelAtaque = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo
    nuevoResultadoDelAtaque.innerHTML = resultadoAtaque

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
    spanResultadoAtaque.appendChild(nuevoResultadoDelAtaque)
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal
    
    botonPiedra.disabled = true
    botonPapel.disabled = true
    botonTijera.disabled = true
    botonLagarto.disabled = true
    botonSpock.disabled = true
    
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {
    personajeDelJugadorObjeto.x = personajeDelJugadorObjeto.x + personajeDelJugadorObjeto.velocidadX
    personajeDelJugadorObjeto.y = personajeDelJugadorObjeto.y + personajeDelJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.clientWidth, mapa.clientHeight)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    
    personajeDelJugadorObjeto.pintarPersonaje()
    sheldonEnemigo.pintarPersonaje()
    leonardEnemigo.pintarPersonaje()
    pennyEnemigo.pintarPersonaje()
    howardEnemigo.pintarPersonaje()
    rajEnemigo.pintarPersonaje()
    amyEnemigo.pintarPersonaje()
    stuartEnemigo.pintarPersonaje()
    bernadetteEnemigo.pintarPersonaje()

    if (personajeDelJugadorObjeto.velocidadX !== 0 || personajeDelJugadorObjeto.velocidadY !== 0){
        revisarColision(sheldonEnemigo)
        revisarColision(leonardEnemigo)
        revisarColision(pennyEnemigo)
        revisarColision(howardEnemigo)
        revisarColision(rajEnemigo)
        revisarColision(amyEnemigo)
        revisarColision(stuartEnemigo)
        revisarColision(bernadetteEnemigo)
    }
}

function moverDerecha(){
    personajeDelJugadorObjeto.velocidadX = 5
}

function moverIzquierda(){
    personajeDelJugadorObjeto.velocidadX = -5
}

function moverAbajo(){
    personajeDelJugadorObjeto.velocidadY = 5
}

function moverArriba(){
    personajeDelJugadorObjeto.velocidadY = -5
}

function detenerMovimiento() {
    personajeDelJugadorObjeto.velocidadX = 0
    personajeDelJugadorObjeto.velocidadY = 0
}

function sePrecionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp': 
            moverArriba()     
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break

        default:
            break
    }
}

function iniciarMapa() {
    personajeDelJugadorObjeto = obtenerObjetoPersonaje(personajeJugador)
    console.log(personajeDelJugadorObjeto)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePrecionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoPersonaje() {
    for (let i = 0; i < personajes.length; i++) {
        if( personajeJugador === personajes[i].nombre ){
            return personajes[i]
        }    
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaPersonaje = personajeDelJugadorObjeto.y
    const abajoPersonaje = personajeDelJugadorObjeto.y + personajeDelJugadorObjeto.alto
    const derechaPersonaje = personajeDelJugadorObjeto.x + personajeDelJugadorObjeto.ancho
    const izquierdaPersonaje = personajeDelJugadorObjeto.x

    if (
        abajoPersonaje < arribaEnemigo || arribaPersonaje > abajoEnemigo || derechaPersonaje < izquierdaEnemigo || izquierdaPersonaje > derechaEnemigo
    ) {
        return
    } 

    if (confirm(`¿Desear batallar con ${enemigo.nombre}?` )){
        detenerMovimiento()
        clearInterval(intervalo)
        sectionSeleccionarAtaque.style.display = 'flex'
        sectionVerMapa.style.display = 'none'
        seleccionarPersonajeEnemigo(enemigo)
    } else {
        detenerMovimiento()
        return
    }   
}

window.addEventListener('load', iniciarJuego)