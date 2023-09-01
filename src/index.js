import express from "express"
import prodsRouter from "./routes/products.routes.js";
import { __dirname } from "./path.js";
import path from 'path';
import cartRouter from "./routes/carts.routes.js";
import { Server } from "socket.io";
import { engine } from 'express-handlebars';

const app = express()
const PORT =8080


const serverExpress = app.listen(PORT, ()=> {
    console.log(`Server on port ${PORT}`)
    } )
    
//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('handlebars', engine()) 
app.set('view engine', 'handlebars') 
app.set('views', path.resolve(__dirname, './views')) 
app.use('/static', express.static(path.join(__dirname, '/public')))



app.use('/static',express.static(path.join(__dirname, '/public')))


const io = new Server (serverExpress)
const prods = []
io.on('connection', (socket) => {
    console.log("Servidor Socket.io conectado")
    socket.on('mensajeConexion', (user)=> {
        if(user.rol === "Admin"){
            socket.emit('credencialesConexion', 'Usuario valido')
        } else {
            socket.emit('credencialesConexion', 'Usuario invalido')
        }
    })

    socket.on('nuevoProducto', (nuevoProd) => {
        prods.push(nuevoProd)
        socket.emit('prods', prods)
        console.log(prods)
    })


})

//Routes
app.use('/api/products', prodsRouter)
app.use('/api/carts', cartRouter)
app.get('/static',(req, res) =>{
    res.render('realTimeProducts',{
    css:"style.css"
})
})


