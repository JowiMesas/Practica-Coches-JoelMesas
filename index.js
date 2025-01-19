
class Circuito {
constructor(nombre,tiempo, longitud) {
    this.nombre = nombre;
    this.tiempo = tiempo;
    this.longitud = longitud;
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
    caida = false;
    constructor(modelo, traccion, minAvance, maxAvance) {
        super(modelo, traccion, minAvance, maxAvance);
    }
    calcularAvance(tiempo) {
        let avance = Math.floor(Math.random() * (this.maxAvance - this.minAvance + 1)) + this.minAvance;
        if(this.traccion === 'dura') {
            avance += 5;
        } else if (this.traccion === 'mediana') {
            avance +=2
        }
        // seCae(tiempo){
        //     const porcentajes = {
        //         lluvioso: {dura: 30, media: 20, blanda: 5},
        //         humedo: {dura: 20, media: 10, blanda: 5},
        //         seco: {dura: 5,media: 5, blanda: 5}
        //     };
        // }
    }
}
class Coche extends Vehiculo {
constructor(modelo, traccion, minAvance, maxAvance) {
    super(modelo, traccion, minAvance, maxAvance);
}
calcularAvance(tiempo) {
    let avance = Math.floor(Math.random() * (this.maxAvance - this.minAvance + 1)) + this.minAvance;
    const modificadores = {
        lluvioso: {blanda: 4, mediana: 2, dura: 0},
        humedo: {blanda: 2, mediana: 2, dura: 2},
        seco: {blanda: 0, mediana: 2, dura: 4},
    };
    avance += modificadores[tiempo][this.traccion];
    return avance;
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
    })
}
actualizarDatalist();
function crearParticipante() {
    const nombreInput = document.getElementById('seleccion-participantes');
    const modeloInput = document.getElementById('vehiculo-participante');
    const nombre = nombreInput.value;
    const modeloVehiculo = modeloInput.value;

    const existe = participantes.find(participante => participante.nombre ==  nombre);
    if(existe) {
        alert("Este participante ya existe")
        return;
    }
    const nuevoParticipante = new Participante(nombre,modeloVehiculo,0,0,0,0);
    participantes.push(nuevoParticipante);
    alert("Participante creado!");
    actualizarDatalist();
    nombreInput.value = '';
    }
    function crearVehiculo() {
        const modeloInput = document.getElementById('seleccion-vehiculos');
        const modeloVehiculo = modeloInput.value;
        const minVelocidadInput = document.getElementById('minVelocidad');
        const minVelocidad = minVelocidadInput.value;
        const maxVelocidadInput = document.getElementById('maxVelocidad');
        const maxVelocidad = maxVelocidadInput.value;
        const tipoTraccion = document.getElementById('tipoTraccion').value;
        const tipoVehiculo = document.getElementById('tipoVehiculo').value;


        const existe = vehiculos.find(vehiculo => vehiculo.modelo == modeloVehiculo);
        if (existe) {
            alert("Ese modelo de vehiculo ya existe ")
            return;
        } else if(minVelocidad >= maxVelocidad) {
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