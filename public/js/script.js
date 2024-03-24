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

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('searchForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

        const searchTerm = document.getElementById('searchInput').value.trim(); // Obtén el valor del campo de búsqueda y elimina los espacios en blanco al principio y al final

        if (searchTerm) {
            // Redirige a la URL de búsqueda con el término de búsqueda como parámetro
            window.location.href = `/shop?buscar=${encodeURIComponent(searchTerm)}`;
        }
    });
});

function handleSearch(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente
        // Obtén el valor del campo de búsqueda
        const searchTerm = document.getElementById('buscar').value;
        // Redirige a la misma página con el término de búsqueda como parámetro de consulta
        window.location.href = `/shop?buscar=${encodeURIComponent(searchTerm)}`;
    }
};
