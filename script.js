const horarios = ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"];
const dias = ["lunes", "martes", "miercoles", "jueves", "viernes"];

dias.forEach(dia => {
  const contenedor = document.getElementById(dia);

  horarios.forEach(hora => {
    const btn = document.createElement("button");
    btn.className = "slot";
    btn.innerText = `${hora} - Disponible`;

    btn.addEventListener("click", () => {
      btn.classList.add("booked");
      btn.innerText = `${hora} - Reservado`;
    });

    contenedor.appendChild(btn);
  });
});