// ******************** Autor ******************************************************
// Autor: Diego Alonso Trujillo
// Webside: https://diego-trujillo-portafolio.herokuapp.com/

// ***********************************************************************************

const {
    response,
    request
} = require('express')
const Usuario = require('../models/usuario.model')
const bcryptjs = require('bcryptjs')
// const { emailExiste } = require('../helpers/db-validatiors')

const usuariosGet = (req, res = response) => {
    const {
        q,
        nombre = 'no mane',
        apikey,
        page = 2,
        limit = 12
    } = req.query

    res.json({
        message: 'Get API - controlador usuarios',
        q,
        nombre,
        apikey,
        page,
        limit
    })
}

const usuariosPut = async (req = request, res = response) => {
    const {
        id
    } = req.params
    const {
        _id,
        password,
        google,
        correo,
        ...resto
    } = req.body


    // TODO: validar CONTRA LA BASE DE DATOS

    if (password) {
        // encriptar el password
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {
        new: true,
        runValidators: true
    })

    res.json({
        message: 'Usuario actualizado con exito!!!',
        usuario
    })
}




const usuariosPost = async (req, res = response) => {
    try {
        const {
            nombre,
            correo,
            password,
            rol
        } = req.body

        const usuario = new Usuario({
            nombre,
            correo,
            password,
            rol
        })

        // // encriptar el password
        const salt = bcryptjs.genSaltSync()
        usuario.password = bcryptjs.hashSync(password, salt)

        // / guardar el usuario en la base de datos
        await usuario.save()
        res.json({
            msg: 'Usuario registrado',
            usuario
        })

        // console.log(usuario)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hubo un error'
        })
    }
}

const usuariosDelete = (req, res = response) => {
    res.json({
        message: 'Delete API - controlador usuarios'
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        message: 'Patch API - controlador usuarios'
    })
}

const usuariosError = (req, res = response) => {
    res.json({
        message: 'ERROR !! API - controlador usuarios'
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
    usuariosError
}