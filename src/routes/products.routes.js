import { Router } from "express";
import ProductManager from "../services/ProductoManager.js";
 

const productManager = new ProductManager
const prodsRouter = Router()

 prodsRouter.get('/', async (req, res)=> {
    const {limit} = req.query

const prods = await productManager.getProducts ()

const products = prods.slice(0, limit)

res.status (200).send (products)

 })

 prodsRouter.get('/:id', async (req, res)=> {
    const {id} = req.params

    const prod = await productManager.getProductsById (parseInt(id))

     if(prod) 
        res.status (200).send(prod)
    else 
       res.status(404).send("Producto no encontrado")

 })

 prodsRouter.post('/', async(req,res) =>{
    
    const confirmacion = await  productManager.addProduct(req.body)
    if (confirmacion) {
        req.status(200).send("Product creado")
    
    } else  {
      
        res.status(400).send("Producto no creado")
    }

 })
 prodsRouter.put('/:id', async(req,res) =>{
    const {id} = req.params;
    const confirmacion = await  productManager.updateProduct (parseInt(req.params.id), req.body)
    if (confirmacion) {
       await productManager.updateProduct(parseInt(id), req.body)
       res.status(200).send("Producto Actualizado")
    } else  {
        
        res.status(404).send("Producto no encontrado")
    }

 })

 prodsRouter.delete('/:id', async(req,res) =>{
    
    const confirmacion = await  productManager.deleteProduct (parseInt(req.params.id))
    if (confirmacion) {
       await productManager.deleteProduct(parseInt(id), req.body)
       res.status(200).send("Producto eliminado")
    } else  {
        
        res.status(404).send("Producto no encontrado")
    }

 })



 export default prodsRouter 