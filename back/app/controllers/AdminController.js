'use strict';
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const jwt = require('../helpers/jwt');
const { validationResult } = require("express-validator");

exports.registroAdmin = (req, res) => {
    const data = req.body;
    delete data.verified;
    
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

exports.getItems = async (req, res) => {
    const data = await Admin.find();

    res.status(200).send({ data });
}

exports.getItem = async (req, res) => {
    const id = req.params.id;
    const data = await Admin.findById(id);
    
    res.status(200).send({ data });
}

exports.updateItem = async (req, res) => {
    const id = req.params.id;

    const data = await Admin.findByIdAndUpdate(id, req.body);

    res.status(200).send({ message: 'Registro actualizado exitosamente', data });
}

exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    const data = await Admin.findByIdAndDelete(id);
    
    if(data){
        res.status(200).send({
            message: 'Registro eliminado exitosamente',
            data
        })
    }else{
        res.status(200).send({ message: 'Registro no encontrado' })
    }
}
