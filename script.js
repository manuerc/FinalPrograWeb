document.addEventListener("DOMContentLoaded", () => {
  const horarios = ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"];
  const dias = ["lunes", "martes", "miercoles", "jueves", "viernes"];
  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio",
                 "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const btnCancelar = document.getElementById("cancelarTurno");

  let turnoReservado = null;
  let botonReservado = null;

  const reservaExistente = localStorage.getItem("reserva");
  let reservaData = null;

  if (reservaExistente) {
    reservaData = JSON.parse(reservaExistente);
    turnoReservado = `${reservaData.hora} del ${reservaData.dia}`;
    btnCancelar.style.display = "inline-block";
  }

  // Retorna la fecha del lunes de la semana actual o próxima (si hoy es domingo)
  function getFechaLunesCorrecta() {
    const hoy = new Date();
    const diaHoy = hoy.getDay(); // 0 = domingo, 1 = lunes, ..., 6 = sábado
    const lunes = new Date(hoy);

    if (diaHoy === 0) {
      // Si es domingo, mostrar la semana próxima
      lunes.setDate(hoy.getDate() + 1); // lunes siguiente
    } else {
      // Si es cualquier otro día, mostrar la semana actual
      lunes.setDate(hoy.getDate() - (diaHoy - 1));
    }
    return lunes;
  }

  const hoy = new Date();
  const lunesBase = getFechaLunesCorrecta();

  dias.forEach((dia, i) => {
    const contenedor = document.getElementById(dia);
    const fecha = new Date(lunesBase);
    fecha.setDate(lunesBase.getDate() + i);

    const diaNumero = fecha.getDate();
    const mesNombre = meses[fecha.getMonth()];
    const textoFecha = `${diaNumero} de ${mesNombre}`;

    const p = document.createElement("p");
    p.className = "fecha-dia";
    p.innerText = textoFecha;
    contenedor.appendChild(p);

    horarios.forEach(hora => {
      const btn = document.createElement("button");
      btn.className = "slot";
      btn.innerText = `${hora} - Disponible`;

      // Comparar fecha del turno con hoy para deshabilitar si es pasado
      const fechaTurno = new Date(fecha);
      const [h, m] = hora.split(":");
      fechaTurno.setHours(parseInt(h), parseInt(m));

      const hoyBase = new Date();
      hoyBase.setHours(0, 0, 0, 0);
      const esPasado = fechaTurno < hoyBase;

      if (esPasado) {
        btn.disabled = true;
        btn.style.opacity = 0.5;
        btn.style.cursor = "not-allowed";
      }

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
          const fechaExacta = fecha.toISOString().split('T')[0]; // YYYY-MM-DD
          const reserva = { nombre, dia, hora, fecha: fechaExacta };
          localStorage.setItem("reserva", JSON.stringify(reserva));
          window.location.href = "confirmacion.html";
        }
      });

      contenedor.appendChild(btn);
    });
  });

  btnCancelar.addEventListener("click", () => {
    if (confirm("¿Estás seguro de que querés cancelar tu turno?")) {
      localStorage.removeItem("reserva");
      location.reload();
    }
  });
});
