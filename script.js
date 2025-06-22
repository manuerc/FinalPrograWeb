document.addEventListener("DOMContentLoaded", () => {
  const horarios = ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"];
  const dias = ["lunes", "martes", "miercoles", "jueves", "viernes"];
  const btnCancelar = document.getElementById("cancelarTurno");

  let turnoReservado = null;
  let botonReservado = null;

  // Leer reserva previa de localStorage
  const reservaExistente = localStorage.getItem("reserva");
  let reservaData = null;

  if (reservaExistente) {
    reservaData = JSON.parse(reservaExistente);
    turnoReservado = `${reservaData.hora} del ${reservaData.dia}`;
    btnCancelar.style.display = "inline-block"; // Mostrar botón cancelar si hay reserva
  }

  dias.forEach(dia => {
    const contenedor = document.getElementById(dia);

    horarios.forEach(hora => {
      const btn = document.createElement("button");
      btn.className = "slot";
      btn.innerText = `${hora} - Disponible`;

      // Marcar turno reservado
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
        if (turnoReservado) {
          alert("Ya reservaste un turno. Si querés cambiarlo, primero cancelalo.");
          return;
        }

        const nombre = prompt("Ingresá tu nombre para reservar este turno:")?.trim();

        if (nombre) {
          // Guardar en localStorage
          const reserva = { nombre, dia, hora };
          localStorage.setItem("reserva", JSON.stringify(reserva));

          // Redirigir
          window.location.href = "confirmacion.html";
        }
      });

      contenedor.appendChild(btn);
    });
  });

  // Cancelar turno
  btnCancelar.addEventListener("click", () => {
    if (confirm("¿Estás seguro de que querés cancelar tu turno?")) {
      localStorage.removeItem("reserva");
      location.reload(); // Recargar para que la interfaz se actualice
    }
  });
});
