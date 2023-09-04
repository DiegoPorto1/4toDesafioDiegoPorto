

 const socket = io()
 const form = document.getElementById('idForm')
const botonProds = document.getElementById('botonProductos')
const botonDelete = document.getElementById('botonEliminar')

 form.addEventListener('submit', (e) => {
    e.preventDefault()
    const datForm = new FormData(e.target) 
   const prod = Object.fromEntries(datForm)
    socket.emit('nuevoProducto', prod)
    e.target.reset()
})


/*botonProds.addEventListener('click',()=> {
    socket.on('prods', (prods)=>{
        console.log(prods)
    })
    
})*/



    socket.on('prods', (prods) => {
      const container = document.getElementById('prods-container');
      container.innerHTML = "";
      const ul = document.createElement("ul");
      prods.forEach((product) => {
        const li = document.createElement("li")
        li.textContent=`Nombre: ${product.title}, descripcion: ${product.description},Precio: ${product.price},Codigo: ${product.code},Stock: ${product.stock}, id: ${product.id}`;
        ul.appendChild(li)
        
      });
      container.appendChild(ul)
    
    });
  

  botonProds.addEventListener('click', () => {
    socket.emit ("actualizarLista");
  });

  botonDelete.addEventListener('click', () => {
    socket.emit ("borrarProducto");
  });
