document.addEventListener("DOMContentLoaded", () => {
  const horarios = ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"];
  const dias = ["lunes", "martes", "miercoles", "jueves", "viernes"];
  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const btnCancelar = document.getElementById("cancelarTurno");

  const overlay = document.getElementById("form-overlay");
  const inputNombre = document.getElementById("input-nombre");
  const inputTelefono = document.getElementById("input-telefono");
  const btnFormCancelar = document.getElementById("form-cancelar");
  const btnFormConfirmar = document.getElementById("form-confirmar");

  let turnoReservado = null;
  let botonReservado = null;
  let reservaTemp = {};

  const reservaExistente = localStorage.getItem("reserva");
  let reservaData = null;

  if (reservaExistente) {
    reservaData = JSON.parse(reservaExistente);
    turnoReservado = `${reservaData.hora} del ${reservaData.dia}`;
    btnCancelar.style.display = "inline-block";
  }

  function getFechaLunesCorrecta() {
    const hoy = new Date();
    const diaHoy = hoy.getDay();
    const lunes = new Date(hoy);
    if (diaHoy === 0) {
      lunes.setDate(hoy.getDate() + 1);
    } else {
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

        reservaTemp = {
          dia,
          hora,
          fecha: fecha.toISOString().split('T')[0]
        };

        inputNombre.value = "";
        inputTelefono.value = "";
        overlay.style.display = "flex";
      });

      contenedor.appendChild(btn);
    });
  });

  btnFormCancelar.addEventListener("click", () => {
    overlay.style.display = "none";
  });

  btnFormConfirmar.addEventListener("click", () => {
    const nombre = inputNombre.value.trim();
    const telefono = inputTelefono.value.trim();

    if (!nombre || !telefono) {
      alert("Por favor completá ambos campos.");
      return;
    }

    const reserva = {
      ...reservaTemp,
      nombre,
      telefono
    };

    localStorage.setItem("reserva", JSON.stringify(reserva));
    window.location.href = "confirmacion.html";
  });

  btnCancelar.addEventListener("click", () => {
    if (confirm("¿Estás seguro de que querés cancelar tu turno?")) {
      localStorage.removeItem("reserva");
      location.reload();
    }
  });
});
