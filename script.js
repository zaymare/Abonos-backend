// Datos de abonos (simulación)
const abonos = [];

// Función para mostrar la lista de abonos
function mostrarAbonos() {
    const abonoTabla = document.getElementById("abono-tabla");
    const abonoTablaBody = abonoTabla.getElementsByTagName("tbody")[0];
    abonoTablaBody.innerHTML = "";

    for (let i = 0; i < abonos.length; i++) {
        const abono = abonos[i];
        const row = abonoTablaBody.insertRow(i);

        const clienteCell = row.insertCell(0);
        clienteCell.innerHTML = abono.nombre;

        const montoCell = row.insertCell(1);
        montoCell.innerHTML = `$${abono.monto}`;

        const estadoCell = row.insertCell(2);
        estadoCell.innerHTML = abono.pagado ? "Pagado" : "Pendiente";

        const accionesCell = row.insertCell(3);

        const editarButton = document.createElement("button");
        editarButton.innerText = "Editar";
        editarButton.addEventListener("click", () => editarAbono(i));
        accionesCell.appendChild(editarButton);

        // Agregar un espacio en blanco entre los botones
        accionesCell.appendChild(document.createTextNode(" "));

        const cambiarEstadoButton = document.createElement("button");
        cambiarEstadoButton.innerText = abono.pagado ? "Marcar Pendiente" : "Marcar Pagado";
        cambiarEstadoButton.addEventListener("click", () => cambiarEstadoAbono(i));
        accionesCell.appendChild(cambiarEstadoButton);
    }
}


// Función para registrar un nuevo abono
function registrarAbono(nombre, monto) {
    const abono = {
        nombre,
        monto,
        pagado: false
    };
    abonos.push(abono);
    mostrarAbonos();
}

// Función para editar un abono
function editarAbono(index) {
    const nuevoMonto = parseFloat(prompt("Ingrese el nuevo monto del abono:"));
    if (!isNaN(nuevoMonto)) {
        abonos[index].monto = nuevoMonto;
        mostrarAbonos();
    }
}

// Función para cambiar el estado de un abono
function cambiarEstadoAbono(index) {
    abonos[index].pagado = !abonos[index].pagado;
    mostrarAbonos();
}

// Manejo del formulario de registro de abonos
const abonoForm = document.getElementById("abono-form");
abonoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const monto = parseFloat(document.getElementById("monto").value);
    if (nombre && !isNaN(monto)) {
        registrarAbono(nombre, monto);
        document.getElementById("nombre").value = "";
        document.getElementById("monto").value = "";
    }
});

// Mostrar abonos iniciales
mostrarAbonos();
