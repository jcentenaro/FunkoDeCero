// JavaScript para el comportamiento del botón flotante
document.addEventListener("DOMContentLoaded", function () {
  // Obtener el botón flotante
  var floatingButton = document.getElementById("floatingButton");

  // Agregar un evento de clic al botón flotante
  floatingButton.addEventListener("click", function () {
    // Aquí puedes escribir el código para la acción que deseas que realice el botón flotante
    alert("¡Botón flotante clicado!");
  });
});

function submitOrderForm() {
  document.getElementById("orderForm").submit(); // Envía el formulario cuando se selecciona una opción
}
