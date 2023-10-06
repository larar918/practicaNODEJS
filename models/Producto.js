const mongoose = require('mongoose');

const productoSchema = mongoose.Schema({
    nombre: {type: String, index:true},
    venta: {type:Boolean, index:true},
    precio: Number,
    foto: String,
    tags: [{ type:String, index: true }]
});

// Filtrado
productoSchema.statics.paginacion = function(skip, limit, filtro) {
    const query = Producto.find(filtro); 
    query.skip(skip);
    query.limit(limit);
    return query.exec();
}

const Producto = mongoose.model('Producto',productoSchema);
module.exports = Producto;