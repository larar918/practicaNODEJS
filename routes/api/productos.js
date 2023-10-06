const express = require('express');
const router = express.Router();
const Producto = require('../../models/Producto');

// GET: Listado con paginación y filtros
// http://127.0.0.1:3000/api/productos?nombre=iphone&tag=mobile
router.get('/',async (req,res,next) => {
    try{
        const skip = req.query.skip;
        const limit = req.query.limit;
        const tag = req.query.tag;
        const venta = req.query.venta;
        const nombre = req.query.nombre;
        const precio = req.query.precio;

        // Creamos un filtro en el que el tag, el tipo de anuncio y el precio parametros de búsqueda opcionales
        // Este filtro lo usará en el modelo para imprimir los datos

        const filtro = {}

        if(tag){
            filtro.tags = tag;
        }
        if(venta){
            filtro.venta = venta;
        }
        if(nombre){
            filtro.nombre = new RegExp('^' + nombre, 'i');
        }
        if (precio) {
            // Analizamos el valor del parámetro precio y construimos el filtro adecuado
            const precioParts = precio.split('-');

            if (precioParts.length === 2) {
                const [precioMin, precioMax] = precioParts;
                if (precioMin) {
                    filtro.precio = { $gte: precioMin };
                }
                if (precioMax) {
                    filtro.precio = { ...filtro.precio, $lte: precioMax };
                }
            } else if (precioParts.length === 1) {
                const valorPrecio = precioParts[0];
                if (valorPrecio) {
                    filtro.precio = valorPrecio;
                }
            }
        }
        
        const productos = await Producto.paginacion(skip, limit, filtro);

        res.json({ results: productos })

    }catch(err){
        next(err)
    }
});

// GET: Listar los tags que tenemos en la base de datos
// http://127.0.0.1:3000/api/productos/tags
router.get('/tags', async (req, res, next) => {
    try {
      const tags = await Producto.distinct('tags');
      res.json({ tags: tags });

    } catch (err) {
      next(err);
    }
});

// POST: Crear un producto (POSTMAN)
router.post('/', async (req, res, next) => {
    try {
      const productoData = req.body;
  
      // creamos una instancia de agente en memoria
      const producto = new Producto(productoData);
  
      // la persistimos en la BD
      const productoGuardado = await producto.save();
  
      res.json({ result: productoGuardado });
  
    } catch (err) {
      next(err);
    }
  });
  

module.exports = router;