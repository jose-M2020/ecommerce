'use strict';

const bcrypt = require('bcrypt');
const Cliente = require('../models/Cliente');
const jwt = require('../helpers/jwt');

exports.registroCliente = async (req, res) => {
    const data = req.body;
    delete data.verified;
    
    const user = await Cliente.findOne({email:data.email});

    if(!user){
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

exports.login = async (req, res) => {
    const {body: {email, password}} = req;

    const user = await Cliente.findOne({email});

    if(user){
        bcrypt.compare(password, user.password, async function(error,check){
            if(check){
                // if(data.carrito.length >= 1){
                //     for(var item of data.carrito){
                //         await Carrito.create({
                //             cantidad:item.cantidad,
                //             producto:item.producto._id,
                //             variedad:item.variedad.id,
                //             cliente:user._id
                //         });
                //     }
                // }

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

exports.getItems = async (req, res) => {
    const data = await Cliente.find();

    res.status(200).send({ data });
}

exports.getItem = async (req, res) => {
    const id = req.params.id;
    const data = await Cliente.findById(id);
    
    res.status(200).send({ data });
}

exports.updateItem = async (req, res) => {
    const id = req.params.id;

    const data = await Cliente.findByIdAndUpdate(id, req.body);

    res.status(200).send({ message: 'Registro actualizado exitosamente', data });
}

exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    const data = await Cliente.findByIdAndDelete(id);
    
    if(data){
        res.status(200).send({
            message: 'Registro eliminado exitosamente',
            data
        })
    }else{
        res.status(200).send({ message: 'Registro no encontrado' })
    }
}
