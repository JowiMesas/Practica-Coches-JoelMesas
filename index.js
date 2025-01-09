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
    constructor(modelo, traccion, minAvance, maxAvance, caida) {
        super(modelo, traccion, minAvance, maxAvance);
        this.caida = caida;
    }
    calcularAvance(terreno) {
        let avance = Math.floor(Math.random() * (this.maxAvance - this.minAvance + 1)) + this.minAvance;
        if(this.traccion === 'dura') {
            avance += 5;
        } else if (this.traccion === 'mediana') {
            avance +=2
        }
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
