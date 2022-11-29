import mongoose from "mongoose";

//Se importo la libreria que permitira encriptar los password en la base de datos
import * as bcrypt from "bcrypt";
//import { Valid } from '../vcorreo/estacorreobien.js'

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
},

    emailVerified: {
        type: Boolean,
        default: false,
    }

},

{
    timestamps: true,
    versionKey: false,
}

);

/*
userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    try {
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password, salt);
        next();
    } catch (error) {
        console.log(error);
        throw new Error("Falló el hash de contraseña");
    }
});
*/
userSchema.methods.comparePassword = async function (password) {
    return await  bcrypt.compareSync(password, usuario.password);
};






userSchema.pre('save', function(next) {
const user = this
const salt = bcrypt.genSaltSync(12);
const hash = bcrypt.hashSync(user.password, salt);
user.password = hash;
next()
});
/*, (error, hash) => {
    user.password = hash
    next()
})*/







userSchema.statics.login = login;

function login(correo,password) {
    console.log('el correo es :',correo);
    console.log('el password es :',password);
    if (!Valid(correo)) { throw new Error('correo es invalido');}
    
    else {   return this.findOne({ correo })
        .then(usuario => {
            console.log(usuario);
          if (!usuario) {
            throw new Error('El correo no corresponde');
           
        }
         // if (!user.emailVerified) throw new Error('user is not verified');
         console.log('El valor del password es:', password);
          const isMatch = bcrypt.compareSync(password, usuario.password);
          console.log('El valor de la comparación del password es:',isMatch);
          if (isMatch) {return true}
          else{return false};
         // if (!isMatch) throw new Error('El password es incorrecto');
         // if (!isMatch) return res.status(403).send({ success: false, message: 'Usuario no autorizado' });
        
        
    
    })}}
  
    

export const usuario = mongoose.model("user",userSchema);
export default usuario;
