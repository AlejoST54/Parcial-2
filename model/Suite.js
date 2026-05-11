class Suite extends Reserva {

    constructor(codigoReserva, nombreHuesped, documento, noches, tarifaNoche, tipoHabitacion) {
        super(codigoReserva, nombreHuesped, documento, noches, tarifaNoche, tipoHabitacion);
        this.vistaAlMar = false;
    }

    calcularValorEstadia() {
        const adicional = 250000;
        return (this.tarifaNoche * this.noches) + adicional;
    }
}
