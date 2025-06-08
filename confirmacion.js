document.addEventListener("DOMContentLoaded", () => {
  const reserva = JSON.parse(localStorage.getItem("reserva"));
  const mensaje = document.getElementById("mensaje");

  if (!reserva) {
    mensaje.innerText = "No tenés ningún turno reservado.";
    return;
  }

  mensaje.innerText = `¡Gracias ${reserva.nombre}! Reservaste tu turno el día ${reserva.dia} en el horario ${reserva.hora}.`;

  document.getElementById("cancelar-turno").addEventListener("click", () => {
    localStorage.removeItem("reserva");
    window.location.href = "index.html";
  });
});