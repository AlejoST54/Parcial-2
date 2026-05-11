class Estandar extends Reserva {

    constructor(codigoReserva, nombreHuesped, documento, noches, tarifaNoche, tipoHabitacion) {
        super(codigoReserva, nombreHuesped, documento, noches, tarifaNoche, tipoHabitacion);
        this.desayunoIncluido = false; 
    }

    calcularValorEstadia() {
        const adicional = 50000;
        return (this.tarifaNoche * this.noches) + adicional;
    }
}
