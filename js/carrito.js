let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function agregarAlCarrito(nombre, precio) {
  const index = carrito.findIndex(p => p.nombre === nombre);
  if (index !== -1) {
    carrito[index].cantidad += 1;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  guardarCarrito();
  actualizarCarrito();
}

function eliminarDelCarrito(nombre) {
  carrito = carrito.filter(item => item.nombre !== nombre);
  guardarCarrito();
  actualizarCarrito();
}

function cambiarCantidad(nombre, nuevaCantidad) {
  const producto = carrito.find(p => p.nombre === nombre);
  if (producto && nuevaCantidad > 0) {
    producto.cantidad = nuevaCantidad;
  } else {
    eliminarDelCarrito(nombre);
  }
  guardarCarrito();
  actualizarCarrito();
}

function actualizarCarrito() {
  const contador = document.getElementById('carrito-contador');
  const lista = document.getElementById('lista-carrito');
  if (!contador || !lista) return;

  contador.textContent = carrito.reduce((acc, p) => acc + p.cantidad, 0);

  lista.innerHTML = carrito.map(item => `
    <li>
      ${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toLocaleString('es-CO')}
      <div class="acciones-carrito">
        <button onclick="cambiarCantidad('${item.nombre}', ${item.cantidad - 1})">➖</button>
        <button onclick="cambiarCantidad('${item.nombre}', ${item.cantidad + 1})">➕</button>
        <button onclick="eliminarDelCarrito('${item.nombre}')">🗑️</button>
      </div>
    </li>
  `).join('');
}

document.addEventListener("DOMContentLoaded", () => {
  fetch('../../pages/menu/carrito-flotante.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('componente-carrito').innerHTML = html;
      actualizarCarrito();

      const btnPedido = document.getElementById("btn-hacer-pedido");
      if (btnPedido) {
        btnPedido.addEventListener("click", function () {
          if (carrito.length === 0) {
            alert('Tu carrito está vacío.');
            return;
          }

          const mensaje = carrito.map((item, i) =>
            `${i + 1}. ${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toLocaleString('es-CO')}`
          ).join('%0A');

          const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
          const url = `https://api.whatsapp.com/send?phone=573006087815&text=Hola! 👋 Quiero hacer un pedido 📝:%0A${mensaje}%0ATotal: $${total.toLocaleString('es-CO')}`;
          window.open(url, '_blank');
        });
      }
    });
});

function abrirModalCarrito() {
  document.getElementById('modal-carrito').classList.add('mostrar');
}

function cerrarModalCarrito(e) {
  const modal = document.getElementById('modal-carrito');
  if (!e || e.target === modal) {
    modal.classList.remove('mostrar');
  }
}
