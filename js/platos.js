function filtrar(categoria) {
    const productos = document.querySelectorAll('.producto-card');
    const titulo = document.getElementById('categoria-titulo');
    const filtros = document.querySelectorAll('.filtro-categorias li');
  
    // Quitar clase activa
    filtros.forEach(f => f.classList.remove('activo'));
  
    // Activar el seleccionado
    const seleccionado = Array.from(filtros).find(f =>
      f.textContent.trim().toLowerCase().includes(categoria.replace('-', ' '))
    );
    if (seleccionado) seleccionado.classList.add('activo');
  
    // Cambiar título
    const nombreBonito = categoria === 'todos' ? 'Todos' : capitalize(categoria);
    titulo.textContent = nombreBonito;
  
    // Mostrar/ocultar productos
    productos.forEach(producto => {
      if (categoria === 'todos' || producto.classList.contains(categoria)) {
        producto.style.display = 'block';
      } else {
        producto.style.display = 'none';
      }
    });
  }
  
  function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).replace('-', ' ');
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const botonCategorias = document.getElementById('toggle-categorias');
    const menuCategorias = document.querySelector('.filtro-categorias');
  
    if (botonCategorias && menuCategorias) {
      botonCategorias.addEventListener('click', () => {
        menuCategorias.classList.toggle('abierto');
      });
  
      document.querySelectorAll('.filtro-categorias li').forEach(item => {
        item.addEventListener('click', () => {
          if (window.innerWidth <= 600) {
            menuCategorias.classList.remove('abierto');
          }
        });
      });
    }
  
    // Cierra el menú en móvil por defecto al cargar
    if (window.innerWidth <= 600) {
      const menu = document.querySelector('.filtro-categorias');
      if (menu) {
        menu.classList.remove('abierto');
      }
    }
  });

// Cerrar modal al hacer click fuera de .modal-content
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});
