'use strict';
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');

exports.registroAdmin = async (req, res) => {
    let data = req.body;
    const isEmailRegistered = await Admin.findOne({email:data.email});
    
    if(!isEmailRegistered){
        if(data.password){
            bcrypt.hash(data.password, 10, async (err,hash) => {
                if(hash){
                    data.dni = '';
                    data.password = hash;
                    const newClient = await Admin.create(data);
                    
                    res.status(200).send({
                        message: 'Administrador registrado exitosamente',
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