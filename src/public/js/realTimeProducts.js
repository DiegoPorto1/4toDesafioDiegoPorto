const prodsTemplate = document.getElementById('prods-container');

 const socket = io()
 const form = document.getElementById('idForm')
const botonProds = document.getElementById('botonProductos')

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


botonProds.addEventListener('click', () => {
    socket.on('prods', (prods) => {
      const renderedProds = prodsTemplate({ prods });
      const container = document.getElementById('prods-container');
      container.innerHTML = renderedProds;
    
    });
  });