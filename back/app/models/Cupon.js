'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CuponSchema = Schema({
    codigo: {type: String, required: true},
    tipo: {type: String, required: true}, //Porcentaje | Precio fijo
    valor: {type: Number, required: true},
    limite: {type: Number, required: true},
    createdAt: {type:Date, default: Date.now, require: true}
});

module.exports =  mongoose.model('cupon',CuponSchema);