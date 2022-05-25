'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EtiquetaSchema = Schema({
    titulo: {type: String, required: true},
    slug: {type: String, required: true},
    createdAt: {type:Date, default: Date.now, require: true}
});

module.exports =  mongoose.model('etiqueta',EtiquetaSchema);