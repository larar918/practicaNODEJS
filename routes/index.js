var express = require('express');
var router = express.Router();
const Producto = require('../models/Producto');

/* GET home page. */
/* http://localhost:3000/?nombre=lara */
router.get('/',async (req,res,next) => {
  try{
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
      const productos = await Producto.paginacion(skip=0,limit=0,filtro);
      console.log(productos)
      res.render('index',{ results: productos })
  }catch(err){
      next(err)
  }
});

module.exports = router;
