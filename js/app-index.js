fetch('modelos/modelos.json')
  .then(response => response.json())
  .then(data => {
    const lista = document.getElementById('lista-modelos');
    for (const modelo in data) {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `detalle.html?modelo=${encodeURIComponent(modelo)}`;
      link.textContent = modelo;
      item.appendChild(link);
      lista.appendChild(item);
    }
  });