'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Producto_etiquetaSchema = Schema({
    producto: {type: Schema.ObjectId, ref: 'producto', required: true},
    etiqueta: {type: Schema.ObjectId, ref: 'etiqueta', required: true},
    createdAt: {type:Date, default: Date.now, require: true}
});

module.exports =  mongoose.model('producto_etiqueta',Producto_etiquetaSchema);