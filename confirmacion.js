document.addEventListener("DOMContentLoaded", () => {
  const reserva = JSON.parse(localStorage.getItem("reserva"));
  const mensaje = document.getElementById("mensaje");

  if (!reserva) {
    mensaje.innerText = "No tenés ningún turno reservado.";
    return;
  }

  const [anio, mes, dia] = reserva.fecha.split("-");
  const fechaFormateada = `${dia}/${mes}/${anio}`;

  mensaje.innerText = `¡Gracias ${reserva.nombre}! Reservaste tu turno el día ${reserva.dia} (${fechaFormateada}) a las ${reserva.hora}.`;

  document.getElementById("cancelar-turno").addEventListener("click", () => {
    localStorage.removeItem("reserva");
    window.location.href = "index.html";
  });
});