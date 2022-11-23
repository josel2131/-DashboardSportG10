import mongoose from "mongoose";

//Se importo la libreria que permitira encriptar los password en la base de datos
import * as bcrypt from "bcrypt";

const userSchema= new mongoose.Schema({
    nameuser: {
    type: String,
    require: true,
    unique: true                    //unique pemite que el usuario sea unico. 
},

password: {
    type: String,
    require: true
},
correo: {
    type: String, 
    require: true,
    unique: true
}

},

{
    timestamps: true,
    versionKey: false,
}

);

//el metodo Schema pre me guradara una funcion 
userSchema.pre('updateOne', function(next){
    const user= this

    //Encriptar el usurio con el metodo bcrypt
    //user.variable a encriptar, 10 numero de caracteres de encriptacion
    //Esta funcion se ejecutara antes de ejecutar el modelo, tomando el campo password 
    bcrypt.hash(user.password,10, (error,hash)  => {

        //El metodo HAS es el que tiene el tema de encriptación. 
        user.password= hash;
        next();
    })

})

userSchema.pre('save', function(next) {
    const user = this
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    next()
});
//Le estoy solicitando que me exporte una constante llamada usuario, dentro de la cual contengo el Schema
//el Schema es la informacion que se almacena en la base de datos, este usuario sera imporado desde controlador



export const usuario = mongoose.model("user",userSchema);
export default usuario;
