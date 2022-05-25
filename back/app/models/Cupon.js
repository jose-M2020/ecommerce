'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CuponSchema = Schema({
    codigo: {type: String, required: true},
    disponibilidad: {type: String, required: true},
    valor: {type: Number, required: true},
    limite: {type: Number, required: true},
    tipo: {type: String, required: false},
    createdAt: {type:Date, default: Date.now, require: true}
});

module.exports =  mongoose.model('cupon',CuponSchema);