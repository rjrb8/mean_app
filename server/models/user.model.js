const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    name: { type:String },
    usuario: { type:String, required:true },
    contrasena: { type:String, required:true },
    correo: { type: String },
    saltSecret: String
});

// Custom validation for email
userSchema.path('correo').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

userSchema.path('name').validate((val) => {
    nameReg = /^[A-Za-z\s]+$/g
    return nameReg.test(val);
  }, 'No es un nombre');

// Events
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.contrasena, salt, (err, hash) => {
            this.contrasena = hash;
            this.saltSecret = salt;
            next();
        });
    });
});


// Methods
userSchema.methods.verifyPassword = function (contrasena) {
    console.log(contrasena);
    console.log(this.contrasena);
    return bcrypt.compareSync(contrasena, this.contrasena);
};

userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id},
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    });
}



mongoose.model('User', userSchema);