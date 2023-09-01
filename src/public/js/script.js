const socket = io()

socket.emit('mensajeConexion', {user:"Diego", rol:"Admin"})

socket.on('credencialesConexion', (info)=>{
    console.log(info)
})