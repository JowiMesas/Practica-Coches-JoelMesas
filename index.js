
class Circuito {
constructor(nombre,tiempo, longitud) {
    this.nombre = nombre;
    this.tiempo = tiempo;
    this.longitud = longitud;
    this.participantes = [];
}
}
class Vehiculo {
    constructor(modelo, traccion, minAvance, maxAvance) {
        this.modelo = modelo;
        this.traccion = traccion;
        this.minAvance = minAvance;
        this.maxAvance = maxAvance;
    }
}

class Moto extends Vehiculo {
    constructor(modelo, traccion, minAvance, maxAvance) {
        super(modelo, traccion, minAvance, maxAvance);
        this.caida = false;
        this.turnosCaida = 0;
    }
    calcularAvance(tiempo) {
        if (this.caida) {
            this.turnosCaida--;
            if (this.turnosCaida === 0) this.caida = false;
            return 0; // No avanza si está caída
        }
    
        const avanceBase = Math.floor(Math.random() * (this.maxAvance - this.minAvance + 1)) + this.minAvance;
        let avance = avanceBase;
    
        if (this.traccion === "dura") {
            avance += 5;
        } else if (this.traccion === "mediana") {
            avance += 2;
        }
    
        if (this.seCae(tiempo)) {
            this.caida = true;
            this.turnosCaida = 5; 
            return 0;
        }
    
        return Math.min(avance, this.maxAvance); 
    }
    seCae(tiempo){
        const porcentajes = {
            lluvioso: {dura: 30, media: 20, blanda: 5},
            humedo: {dura: 20, media: 10, blanda: 5},
            seco: {dura: 5,media: 5, blanda: 5},
        };
        const chance = porcentajes[tiempo][this.traccion];
        return Math.random() * 100 < chance;
    }
}
class Coche extends Vehiculo {
constructor(modelo, traccion, minAvance, maxAvance) {
    super(modelo, traccion, minAvance, maxAvance);
}
calcularAvance(tiempo) {
    let avance = Math.floor(Math.random() * (this.maxAvance - this.minAvance + 1)) + this.minAvance;
    const modificadores = {
        lluvioso: {blanda: 4, media: 2, dura: 0},
        humedo: {blanda: 2, media: 2, dura: 2},
        seco: {blanda: 0, media: 2, dura: 4},
    };
    avance += modificadores[tiempo][this.traccion];
    return Math.min(avance, this.maxAvance); 
}
}

class Participante {
    constructor(nombre, vehiculo, primer_lugar,segundo_lugar, tercer_lugar, fueraPodio ) {
        this.nombre = nombre;
        this.vehiculo = vehiculo;
        this.primer_lugar = primer_lugar;
        this.segundo_lugar = segundo_lugar;
        this.tercer_lugar = tercer_lugar;
        this.fueraPodio = fueraPodio;
    }
}
let vehiculos = [
    new Coche('Lamborghini','blanda', 50, 180),
    new Coche('Ferrari', 'media', 60, 190),
    new Moto('Yamaha', 'dura', 40, 140),
    new Moto('Kawasaki', 'media', 45, 120),
    new Coche('Aston Martin', 'blanda', 55, 170)
]
let participantes = [
    new Participante('Fernando Alonso',vehiculos[4],32, 57, 140, 400),
    new Participante('Marc Marquez', vehiculos[2], 24, 40, 57, 340),
    new Participante('Joel', vehiculos[1], 2, 4, 0, 16)
]
let circuitos = [
    new Circuito('Montmelo', 'lluvioso', 1500)
]
function actualizarDatalist() {
    // Limpiar contenido previo de los datalist y select
    document.getElementById('lista-vehiculos').innerHTML = '';
    document.getElementById('lista-participantes').innerHTML = '';
    document.getElementById('vehiculo-participante').innerHTML = '';
    document.getElementById('participantes').innerHTML = '';
    document.getElementById('circuito').innerHTML = '';
    document.getElementById('seleccionar-circuito').innerHTML = '';
    vehiculos.forEach((vehiculo) => {
        document.getElementById('lista-vehiculos').innerHTML += `<option value="${vehiculo.modelo}">${vehiculo.modelo}</option>`;
        document.getElementById('vehiculo-participante').innerHTML += `<option value="${vehiculo.modelo}">${vehiculo.modelo}</option>`;
    });

    participantes.forEach((participante) => {
        document.getElementById('lista-participantes').innerHTML += `<option value="${participante.nombre}">${participante.nombre}</option>`;
        document.getElementById('participantes').innerHTML += `<option value="${participante.nombre}">${participante.nombre}</option>`;

    });
    circuitos.forEach((circuito) => {
        document.getElementById('circuito').innerHTML += `<option value= "${circuito.nombre}">${circuito.nombre}</option>`;
        document.getElementById('seleccionar-circuito').innerHTML += `<option value= "${circuito.nombre}">${circuito.nombre}</option>`;
    })
}
actualizarDatalist();
function crearParticipante() {
    const nombreInput = document.getElementById('seleccion-participantes');
    const modeloInput = document.getElementById('vehiculo-participante');
    const nombre = nombreInput.value;
    const modeloVehiculo = modeloInput.value;
    if(!nombre) {
        alert("El nombre no puede estar vacio");
        return;
    }
    const existe = participantes.find(participante => participante.nombre ==  nombre);
    if(existe) {
        alert("Este participante ya existe")
        return;
    }
    const vehiculoSeleccionado = vehiculos.find((vehiculo) => vehiculo.modelo === modeloVehiculo);

    const nuevoParticipante = new Participante(nombre,vehiculoSeleccionado,0,0,0,0);
    participantes.push(nuevoParticipante);
    alert("Participante creado!");
    actualizarDatalist();
    nombreInput.value = '';
    }
    function crearVehiculo() {
        const modeloInput = document.getElementById('seleccion-vehiculos');
        const modeloVehiculo = modeloInput.value;
        const minVelocidadInput = document.getElementById('minVelocidad');
        const minVelocidad = parseInt(minVelocidadInput.value)
        const maxVelocidadInput = document.getElementById('maxVelocidad');
        const maxVelocidad = parseInt(maxVelocidadInput.value);
        const tipoTraccion = document.getElementById('tipoTraccion').value;
        const tipoVehiculo = document.getElementById('tipoVehiculo').value;
        if(!modeloVehiculo || !minVelocidad || !maxVelocidad) {
            alert("Todos los campos tienen que estar rellenados")
            return;
        }

        const existe = vehiculos.find(vehiculo => vehiculo.modelo == modeloVehiculo);
        if (existe) {
            alert("Ese modelo de vehiculo ya existe ")
            return;
        } 
         if(minVelocidad >= maxVelocidad) {
            alert("La velocidad minima tiene que ser menor que la mayor");
            return;
        }
        let nuevoVehiculo;
        if(tipoVehiculo === "Moto") {
            nuevoVehiculo = new Moto(modeloVehiculo,tipoTraccion ,minVelocidad,maxVelocidad);
        } else if (tipoVehiculo === "Coche"){
            nuevoVehiculo = new Coche(modeloVehiculo, tipoTraccion, minVelocidad, maxVelocidad);
        }
        vehiculos.push(nuevoVehiculo);
        alert("Vehiculo creado correctamente!");
        actualizarDatalist();
        modeloInput.value = '';
        minVelocidadInput.value = '';
        maxVelocidadInput.value = '';

}
function cargarEstadisticasParticipante() {
    const nombre = document.getElementById("seleccion-participantes").value;

    const participante = participantes.find(participante => participante.nombre == nombre);
    if(participante) {
        document.getElementById('estadisticas-primero').value = participante.primer_lugar;
        document.getElementById('estadisticas-segundo').value = participante.segundo_lugar;
        document.getElementById('estadisticas-tercero').value = participante.tercer_lugar;
        document.getElementById('estadisticas-fuera-podio').value = participante.fueraPodio;
        alert(`Estadisticas cargadas del participante ${nombre}`);
        return;
    } else {
        alert(`El participante no existe`);
    }
}
function cargarEstadisticasVehiculo() {
    const modeloVehiculo = document.getElementById("seleccion-vehiculos").value;

    const vehiculo = vehiculos.find(vehiculo => vehiculo.modelo == modeloVehiculo);
    if(vehiculo) {
        const divEstadisticas = document.getElementById('vehiculo-estadisticas');
        divEstadisticas.innerHTML = `
            <h3>Estadísticas del Vehículo</h3>
            <p><strong>Modelo:</strong> ${vehiculo.modelo}</p>
            <p><strong>Tracción:</strong> ${vehiculo.traccion}</p>
            <p><strong>Velocidad Mínima:</strong> ${vehiculo.minAvance}</p>
            <p><strong>Velocidad Máxima:</strong> ${vehiculo.maxAvance}</p>
        `;
    } else {
        alert("No existe ese Vehiculo");
    }
} 
function crearCircuito() {
    const nombreInput = document.getElementById("nombre-circuito");
    const nombre = nombreInput.value;
    const tiempo = document.getElementById("tiempo").value;
    const longitudInput = document.getElementById("longitud");
    const longitud = longitudInput.value;
    if(!nombre || !longitud) {
        alert("Has de rellenar todos los campos");
        return;
    }
    const circuitoExistente = circuitos.find(circuito => circuito.nombre == nombre);
    if(circuitoExistente) {
        alert("Este circuito ya existe!");
        return;
    }
    circuitos.push(new Circuito(nombre, tiempo, longitud));
    alert("Circuito creado exitosamente!");
    actualizarDatalist();
    nombreInput.value = '';
    longitudInput.value = '';
}
function asignarParticipantes() {
    const nombreCircuito = document.getElementById("circuito").value;
    const nombreParticipante = document.getElementById("participantes").value;

    const circuito = circuitos.find(circuito => circuito.nombre == nombreCircuito);
    const participante = participantes.find(participante => participante.nombre == nombreParticipante);
    if(circuito.participantes.includes(participante)) {
        alert("Este participante ya esta asignado a este circuito");
        return;
    }
    if(circuito.participantes.length == 5) {
        alert("Solo se pueden asginar 5 participantes por circuito!");
        return;
    }
    circuito.participantes.push(participante);
    alert(`Participante ${nombreParticipante} asignado al circuito ${nombreCircuito}.`);
    actualizarParticipantesAsignados(circuito);

}
function quitarParticipantes() {
    const nombreCircuito = document.getElementById("circuito").value;
    const nombreParticipante = document.getElementById("participantes").value;

    const circuito = circuitos.find(circuito => circuito.nombre == nombreCircuito);
    const participante = participantes.find(participante => participante.nombre == nombreParticipante);

    const posicion = circuito.participantes.indexOf(participante);
    if(posicion === -1) {
        alert("Este participante no se ha asignado al circuito");
        return;
    }
    circuito.participantes.splice(posicion, 1);
    alert(`Participante ${nombreParticipante} eliminado del circuito ${nombreCircuito}.`);
    actualizarParticipantesAsignados(circuito);

}
function actualizarParticipantesAsignados(circuito) {
    const listaAsignados = document.getElementById("participantes-asignados");
    listaAsignados.innerHTML = "";

    circuito.participantes.forEach(participante => {
        const li = document.createElement("li");
        li.textContent = participante.nombre;
        listaAsignados.appendChild(li);
    });
}
function cargarCircuito() {
    const nombreCircuito = document.getElementById("seleccionar-circuito").value;
    const circuito = circuitos.find(circuito => circuito.nombre == nombreCircuito);

    const estadisticasDiv = document.getElementById("estadisticas-circuito");
    estadisticasDiv.innerHTML = `
       <h3>Estadísticas del Circuito</h3>
        <p><strong>Nombre:</strong> ${circuito.nombre}</p>
        <p><strong>Longitud:</strong> ${circuito.longitud} metros</p>
        <p><strong>Tiempo:</strong> ${circuito.tiempo}</p>
    `;
}
function iniciarCarrera() {
    const nombreCircuito = document.getElementById("seleccionar-circuito").value;
    const circuito = circuitos.find(c => c.nombre === nombreCircuito);

    if (circuito.participantes.length <= 1) {
        alert("Asigna al menos 2 participantes al circuito!");
        return;
    }

    const pista = document.getElementById("circuito-visual");
    pista.innerHTML = "";
    const desplazamientoInicial = 20;

    circuito.participantes.forEach((participante, index) => {
        const div = document.createElement("div");
        div.style.left = "0px"; // Posición inicial en la pista
        div.style.top = `${desplazamientoInicial + index * 40}px`; // Ajuste vertical
        div.style.backgroundImage =
            participante.vehiculo instanceof Moto
                ? "url('motos.png')"
                : "url('coches.png')";
        div.style.width = "70px";
        div.style.height = "70px";
        div.style.position = "absolute";
        div.id = `participante-${index}`;
        pista.appendChild(div);
    });

    let distanciaRecorrida = Array(circuito.participantes.length).fill(0);
    let participantesTerminados = 0; // Participantes que acaban la carrera

    const intervalo = setInterval(() => {
        let carreraTerminada = false; 
    
        circuito.participantes.forEach((participante, index) => {
            if (distanciaRecorrida[index] < circuito.longitud) { 
                const avance = participante.vehiculo.calcularAvance(circuito.tiempo);
                distanciaRecorrida[index] += avance;
    
                const div = document.getElementById(`participante-${index}`);
                div.style.left = `${(distanciaRecorrida[index] / circuito.longitud) * 100}%`;
    
                if (distanciaRecorrida[index] >= circuito.longitud) {
                    distanciaRecorrida[index] = circuito.longitud; 
                    carreraTerminada = true;
                }
            }
        });
    
        if (carreraTerminada) {
            clearInterval(intervalo);
            mostrarResultados(circuito, distanciaRecorrida);
        }
    }, 500);
}

function mostrarResultados(circuito, distanciaRecorrida) {
    const resultados = [];
    for (let index = 0; index < circuito.participantes.length; index++) {
        resultados.push({
            participante: circuito.participantes[index],
            distancia: distanciaRecorrida[index],
        });
    }

    // Ordenar los resultados en orden descendente por distancia
    resultados.sort((a, b) => b.distancia - a.distancia);
    const divResultados = document.getElementById("resultados-carrera");
    divResultados.innerHTML = "<h3>Resultados de la Carrera</h3>";

    // Mostrar los resultados ordenados
    for (let index = 0; index < resultados.length; index++) {
        const resultadosParticipantes = document.createElement("div");
        resultadosParticipantes.textContent = `${index + 1}º ${resultados[index].participante.nombre} - ${resultados[index].distancia} metros`;
        divResultados.appendChild(resultadosParticipantes);

        if (index === 0) resultados[index].participante.primer_lugar++;
        else if (index === 1) resultados[index].participante.segundo_lugar++;
        else if (index === 2) resultados[index].participante.tercer_lugar++;
        else resultados[index].participante.fueraPodio++;
    }

    alert("¡La carrera ha terminado! Consulta los resultados.");
}