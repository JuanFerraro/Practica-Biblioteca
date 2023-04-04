const mensaje = document.getElementById("mensaje");
const cerrar = document.getElementById("cerrar");

cerrar.addEventListener("click", () => {
  mensaje.style.display = "none";
});