
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
const vehiculos = [
    new Coche('Lamborghini','blanda', 50, 180),
    new Coche('Ferrari', 'media', 60, 190),
    new Moto('Yamaha', 'dura', 40, 140),
    new Moto('Kawasaki', 'media', 45, 120),
    new Coche('Aston Martin', 'blanda', 55, 170)
]
const participantes = [
    new Participante('Fernando Alonso',vehiculos[4],32, 57, 140, 400),
    new Participante('Marc Marquez', vehiculos[2], 24, 40, 57, 340),
    new Participante('Joel', vehiculos[1], 2, 4, 0, 16)
]
vehiculos.forEach((vehiculo) => {
    document.getElementById('lista-vehiculos').innerHTML +=`<option value="${vehiculo.modelo}">${vehiculo.modelo}</option>`;
});
participantes.forEach((participante) => {
    document.getElementById('lista-participantes').innerHTML +=`<option value="${participante.nombre}"> ${participante.nombre}</option>`;
})
