class Reserva {

    constructor(codigoReserva, nombreHuesped, documento, noches, tarifaNoche, tipoHabitacion) {
        this.codigoReserva   = codigoReserva;
        this.nombreHuesped   = nombreHuesped;
        this.documento       = documento;
        this.noches          = noches;
        this.tarifaNoche     = tarifaNoche;
        this.tipoHabitacion  = tipoHabitacion;
    }

    calcularValorEstadia() {
        let adicional = 0;
        if (this.tipoHabitacion === "D") adicional = 120000;
        if (this.tipoHabitacion === "P") adicional = 500000;
        return (this.tarifaNoche * this.noches) + adicional;
    }

    hallarTotalMensual() {
        const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
        let total = 0;
        reservas.forEach(function(r) {
            total += parseFloat(r.valorEstadia);
        });
        return total;
    }
}
