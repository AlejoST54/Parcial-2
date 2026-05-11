function crearReserva() {

    const codigoReserva  = document.getElementById("codigoReservaId").value;
    const nombreHuesped  = document.getElementById("nombreHuespedId").value;
    const documento      = document.getElementById("documentoId").value;
    const noches         = parseInt(document.getElementById("nochesId").value);
    const tarifaNoche    = parseFloat(document.getElementById("tarifaNocheId").value);
    const tipoHabitacion = document.getElementById("tipoHabitacionId").value;

    let reserva;

    if (tipoHabitacion === "E") {
        const desayunoIncluido = document.getElementById("desayunoId").checked;
        reserva = new Estandar(codigoReserva, nombreHuesped, documento, noches, tarifaNoche, tipoHabitacion);
        reserva.desayunoIncluido = desayunoIncluido;

    } else if (tipoHabitacion === "S") {
        const vistaAlMar = document.getElementById("vistaAlMarId").checked;
        reserva = new Suite(codigoReserva, nombreHuesped, documento, noches, tarifaNoche, tipoHabitacion);
        reserva.vistaAlMar = vistaAlMar;

    } else {
        reserva = new Reserva(codigoReserva, nombreHuesped, documento, noches, tarifaNoche, tipoHabitacion);
    }

    reserva.valorEstadia = reserva.calcularValorEstadia();

    console.log(reserva);

    let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    reservas.push(reserva);
    localStorage.setItem("reservas", JSON.stringify(reservas));

    alert("Reserva creada. Valor estadía: $" + reserva.valorEstadia.toLocaleString("es-CO"));

    limpiarFormulario();
    mostrarReservas();
}
function mostrarReservas() {
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    const tbody = document.querySelector("#tablaReservas tbody");

    tbody.innerHTML = `<tr>
        <th>No.</th>
        <th>Código Reserva</th>
        <th>Nombre Huésped</th>
        <th>Documento</th>
        <th>Noches</th>
        <th>Tarifa/Noche</th>
        <th>Tipo Habitación</th>
        <th>Desayuno Incluido</th>
        <th>Vista al Mar</th>
        <th>Valor Estadía</th>
    </tr>`;

    reservas.forEach(function(r, index) {
        const desayuno = r.tipoHabitacion === "E" ? (r.desayunoIncluido ? "Sí" : "No") : "-";
        const vista    = r.tipoHabitacion === "S" ? (r.vistaAlMar ? "Sí" : "No") : "-";

        const fila = `<tr>
            <td>${index + 1}</td>
            <td>${r.codigoReserva}</td>
            <td>${r.nombreHuesped}</td>
            <td>${r.documento}</td>
            <td>${r.noches}</td>
            <td>$${parseFloat(r.tarifaNoche).toLocaleString("es-CO")}</td>
            <td>${r.tipoHabitacion}</td>
            <td>${desayuno}</td>
            <td>${vista}</td>
            <td>$${parseFloat(r.valorEstadia).toLocaleString("es-CO")}</td>
        </tr>`;
        tbody.innerHTML += fila;
    });

    const total = hallarTotalMensual(reservas);
    document.getElementById("totalMensualId").innerText = "$" + total.toLocaleString("es-CO");
}

function hallarTotalMensual(reservas) {
    let total = 0;
    reservas.forEach(function(r) {
        total += parseFloat(r.valorEstadia);
    });
    return total;
}

function cambiarTipo() {
    const tipo = document.getElementById("tipoHabitacionId").value;

    document.getElementById("campoDesayuno").style.display  = "none";
    document.getElementById("campoVistaAlMar").style.display = "none";

    if (tipo === "E") document.getElementById("campoDesayuno").style.display  = "block";
    if (tipo === "S") document.getElementById("campoVistaAlMar").style.display = "block";
}

function limpiarFormulario() {
    document.getElementById("codigoReservaId").value = "";
    document.getElementById("nombreHuespedId").value = "";
    document.getElementById("documentoId").value = "";
    document.getElementById("nochesId").value = "";
    document.getElementById("tarifaNocheId").value = "";
    document.getElementById("tipoHabitacionId").value = "E";
    document.getElementById("desayunoId").checked = false;
    document.getElementById("vistaAlMarId").checked = false;
    cambiarTipo();
}
