'use strict';
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const jwt = require('../helpers/jwt');

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

exports.login = async (req, res) => {
    const {body: {email, password}} = req;

    const user = await Admin.findOne({email});

    if(user){
        bcrypt.compare(password, user.password, async function(error,check){
            if(check){

                res.status(200).send({
                    data:user,
                    token: jwt.createToken(user)
                });
            }else{
                res.status(200).send({message: 'Los datos ingresados son incorrectos', data: undefined}); 
            }
        });
    }else{
        res.status(200).send({message: 'No existe una cuenta con el correo ingresado', data: undefined});
    } 
}