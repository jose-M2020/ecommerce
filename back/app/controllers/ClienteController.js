'use strict';

const bcrypt = require('bcrypt');
const Cliente = require('../models/Cliente');

exports.registroCliente = async (req, res) => {
    let data = req.body;
    const isEmailRegistered = await Cliente.findOne({email:data.email});

    if(!isEmailRegistered){
        if(data.password){
            bcrypt.hash(data.password, 10, async (err,hash) => {
                if(hash){
                    data.dni = '';
                    data.password = hash;
                    const newClient = await Cliente.create(data);
                    
                    res.status(200).send({
                        message: 'Cliente registrado exitosamente',
                        data: newClient
                    });
                }else{
                    res.status(200).send({
                        message:'Server error',
                        data:undefined
                    });
                }
            })
        }else{
            res.status(200).send({
                message:'No hay una contraseña',
                data:undefined
            });
        }

        
    }else{
        res.status(200).send({
            message:'El correo ya ha sido registrado.',
            data:undefined
        });
    }
}

// module.exports = {
//     registroCliente
// }