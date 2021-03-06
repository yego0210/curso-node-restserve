const mongooose = require('mongoose');
const Schema = mongooose.Schema;



const usuarioSchema = new Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']       
        
        
    },
    correo: {
        type: String,
        unique: true,
        required: [true, 'El correo es obligatorio'],
    },
    password: {
        type: String,
        required: [true, "El password es obligatorio"],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: [true, "El rol es obligatorio"],
        enum: ["ADMIN_ROLE", "USER_ROLE", "VENTAS_ROLE"],
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },


});

usuarioSchema.methods.toJSON = function () { 
    const { __v, password, ...usuario } = this.toObject();
    return usuario;

}

module.exports = mongooose.model('Usuario', usuarioSchema);







