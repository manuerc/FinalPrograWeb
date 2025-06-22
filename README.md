🔗 **Accedé a la aplicación:** [https://manuerc.github.io/FinalPrograWeb](https://manuerc.github.io/FinalPrograWeb)

# 📅 Sistema de Agenda de Turnos - Proyecto Final Programación Web

Este proyecto consiste en una aplicación web para la gestión de turnos de una peluquería. El sistema permite a los clientes reservar un turno de forma autónoma desde una interfaz visual y sencilla, sin necesidad de intermediarios.

---

## ⚙️ Funcionamiento General

- La agenda muestra los días de la semana (lunes a viernes) con sus respectivos horarios disponibles.
- El usuario puede elegir un turno haciendo clic en el botón correspondiente, e ingresar su nombre para confirmarlo.
- Luego de reservar, se redirige a una segunda interfaz que confirma el turno.
- Se permite cancelar el turno reservado directamente desde esa interfaz.
- No se puede agendar más de un turno por semana por persona.
- Los turnos no pueden reservarse ni cancelarse el mismo día del turno.

---

## 📌 Aclaraciones importantes

1. **Sobre la actualización de turnos (Update):**  
   No se implementó un botón de edición directa porque, funcionalmente, resultaría redundante con la opción de cancelar turno. En cambio, al volver desde la segunda interfaz hacia la agenda, el usuario es notificado de que podrá "volver para actualizar el turno", lo que implica cancelar el actual y seleccionar uno nuevo.

2. **Sobre el almacenamiento de datos:**  
   La aplicación utiliza `localStorage`, lo cual implica que las reservas son guardadas localmente en el navegador del usuario.  
   Para que esta aplicación funcione de forma real en un entorno multiusuario, sería necesario reemplazar `localStorage` por una base de datos real (como Firebase, Supabase o una API con backend propio) que permita guardar y sincronizar los turnos globalmente entre usuarios.
