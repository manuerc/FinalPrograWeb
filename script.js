document.addEventListener("DOMContentLoaded", () => { //corregir un error del dom cuando lo hago en github
  const horarios = ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"];
  const dias = ["lunes", "martes", "miercoles", "jueves", "viernes"];

  let turnoReservado = null;
  let botonReservado = null;

  // Leer reserva previa de localStorage (si existe)
  const reservaExistente = localStorage.getItem("reserva");
  let reservaData = null;
  if (reservaExistente) {
    reservaData = JSON.parse(reservaExistente);
    turnoReservado = `${reservaData.hora} del ${reservaData.dia}`;
  }

  dias.forEach(dia => {
    const contenedor = document.getElementById(dia);

    horarios.forEach(hora => {
      const btn = document.createElement("button");
      btn.className = "slot";
      btn.innerText = `${hora} - Disponible`;

      // Si el turno está reservado por este usuario, mostrarlo como reservado y deshabilitado
      if (
        reservaData &&
        reservaData.dia === dia &&
        reservaData.hora === hora
      ) {
        btn.classList.add("booked");
        btn.innerText = `${hora} - ${reservaData.nombre}`;
        btn.disabled = true;
        botonReservado = btn;
      }

      btn.addEventListener("click", () => {
        // Impedir reservar más de un turno
        if (turnoReservado || localStorage.getItem("reserva")) {
          alert("Ya reservaste un turno.");
          return;
        }

        const nombre = prompt("Ingresá tu nombre para reservar este turno:");
        if (nombre && nombre.trim() !== "") {
          // Guardar reserva en localStorage
          localStorage.setItem("reserva", JSON.stringify({
            nombre: nombre.trim(),
            dia,
            hora
          }));
          // Redirigir a confirmación
          window.location.href = "confirmacion.html";
        }
      });

      contenedor.appendChild(btn);
    });
  });
});