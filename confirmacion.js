document.addEventListener("DOMContentLoaded", () => {
  const reserva = JSON.parse(localStorage.getItem("reserva"));
  const mensaje = document.getElementById("mensaje");

  if (!reserva) {
    mensaje.innerText = "No tenés ningún turno reservado.";
    return;
  }

  // Formatear fecha (opcional: de YYYY-MM-DD a formato más legible)
  const fechaParts = reserva.fecha.split("-");
  const fechaFormateada = `${fechaParts[2]}/${fechaParts[1]}/${fechaParts[0]}`; // DD/MM/YYYY

  mensaje.innerText = `¡Gracias ${reserva.nombre}! Reservaste tu turno el día ${reserva.dia} (${fechaFormateada}) a las ${reserva.hora}.`;

  document.getElementById("cancelar-turno").addEventListener("click", () => {
    localStorage.removeItem("reserva");
    window.location.href = "index.html";
  });
});
