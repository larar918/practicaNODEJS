'use strict';

const readline = require('node:readline');
const connection = require('./lib/connectMongoose');
const Producto = require('./models/Producto');
const initData = require('./anuncios.json');

main().catch(err => console.log('Hubo un error', err));

async function main() {

  await new Promise(resolve => connection.once('open', resolve))

  const borrar = await pregunta(
    '¿Estas seguro de que quieres borrar la base de datos y cargar datos iniciales?'
  )
  if (!borrar) {
    process.exit();
  }

  // inicializar la colección de productos
  await initProductos();

  connection.close();
}

async function initProductos() {
  // eliminar productos
  const deleted = await Producto.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} productos`);

  // cargar productos iniciales
  const inserted = await Producto.insertMany(initData.productosIniciales);
  console.log(`Creados ${inserted.length} productos.`);
}

function pregunta(texto) {
  return new Promise((resolve, reject) => {
    // conectar readline con la consola
    const ifc = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    ifc.question(texto, respuesta => {
      ifc.close();
      resolve(respuesta.toLowerCase() === 'si');
    })
  });
}