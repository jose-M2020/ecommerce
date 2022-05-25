'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VariedadSchema = Schema({
    producto: {type: Schema.ObjectId, ref: 'producto', required: true},
    valor: {type: String, required: true},
    stock: {type: String, default: 0, required: true},
    createdAt: {type:Date, default: Date.now, require: true}
});

module.exports =  mongoose.model('variedad',VariedadSchema);