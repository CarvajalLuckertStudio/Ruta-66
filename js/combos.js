function abrirModal(id) {
    document.getElementById(id).style.display = 'block';
  }
  
  function cerrarModal(id) {
    document.getElementById(id).style.display = 'none';
  }
  
  // Cerrar modal con tecla ESC
  window.addEventListener('keydown', function(e) {
    if (e.key === "Escape") {
      document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
    }
  });
  