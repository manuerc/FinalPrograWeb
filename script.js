const horarios = ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"];
const dias = ["lunes", "martes", "miercoles", "jueves", "viernes"];

let turnoReservado = null; // ← Variable para guardar si ya reservó
let botonReservado = null;

dias.forEach(dia => {
  const contenedor = document.getElementById(dia);

  horarios.forEach(hora => {
    const btn = document.createElement("button");
    btn.className = "slot";
    btn.innerText = `${hora} - Disponible`;

    btn.addEventListener("click", () => {
      if (turnoReservado) {
        alert("Ya reservaste un turno.");
        return;
      }

      const nombre = prompt("Ingresá tu nombre para reservar este turno:");
      
      if (nombre && nombre.trim() !== "") {
        btn.classList.add("booked");
        btn.innerText = `${hora} - ${nombre}`;
        btn.disabled = true;

        // Mostrar interfaz de confirmación
        turnoReservado = `${hora} del ${dia}`;
        botonReservado = btn;
        document.getElementById("mensaje-turno").innerText = `Tu turno es el ${dia} a las ${hora}.`;
        document.getElementById("confirmacion").style.display = "block";
      }
    });

    contenedor.appendChild(btn);
  });
});

document.getElementById("cancelar-turno").addEventListener("click", () => {
  if (botonReservado) {
    botonReservado.classList.remove("booked");
    botonReservado.innerText = botonReservado.innerText.split(" - ")[0] + " - Disponible";
    botonReservado.disabled = false;
  }

  turnoReservado = null;
  botonReservado = null;
  document.getElementById("confirmacion").style.display = "none";
});
