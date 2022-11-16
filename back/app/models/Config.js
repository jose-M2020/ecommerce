'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConfigSchema = Schema({
    categorias: [{type: Object, required: true}],
    titulo: {type: String},
    logo: {type: String},
    serie: {type: String},
    correlativo: {type: String},
    // envio_activacion: {type: String, required: true},
    // monto_min_soles: {type: Number, required: true},
    // monto_min_dolares: {type: Number, required: true},
    createdAt: {type:Date, default: Date.now, require: true}
});

module.exports =  mongoose.model('config',ConfigSchema);