let carrito = [];

function agregarAlCarrito(producto) {
  carrito.push(producto);
  actualizarCarrito();
  alert(`${producto} fue agregado al carrito.`);
}

function actualizarCarrito() {
  document.getElementById('carrito-contador').textContent = carrito.length;
  const lista = document.getElementById('lista-carrito');
  lista.innerHTML = carrito.map((item, i) => `<li>${i + 1}. ${item}</li>`).join('');
}

function abrirCarrito() {
  document.getElementById('modal-carrito').style.display = 'block';
  actualizarCarrito();
}

function cerrarCarrito() {
  document.getElementById('modal-carrito').style.display = 'none';
}

document.getElementById("btn-hacer-pedido").addEventListener("click", function () {
  if (carrito.length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }
  const mensaje = carrito.map((item, i) => `${i + 1}. ${item}`).join('%0A');
  const url = `https://api.whatsapp.com/send?phone=573006087815&text=Hola! 👋 Quiero hacer una reserva 📝 y estos son los productos que seleccioné:%0A${mensaje}`;
  this.href = url;
});
