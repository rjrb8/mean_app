const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const usuariosCtrl = {};

const User = mongoose.model('User');

usuariosCtrl.getUsuarios = async (req, res) => {
    //res.json({
     // status: 'Api works'
     //});
     const usuario = await User.find()//Busca los datos en el modelo de bd que se conecta a mongodb
     res.json(usuario);
} 

usuariosCtrl.obtenerUsuario = async (req, res) => {
    console.log(req.params.id);
    //res.json('recived');
    const usu = await User.findById(req.params.id);
    res.json(usu);
}

usuariosCtrl.BorrarUsuario = async (req, res) => {
    //const { id } = req.params.id;//Otra forma de colocar en una variable
    await User.findByIdAndRemove(req.params.id);
    res.json({status: 'Usuario borrado'});
}

usuariosCtrl.EditarUsuario = async (req, res) => {
    //const { id } = req.params.id;//Otra forma de colocar en una variable
    const usuario = {
        name: req.body.name,
        usuario: req.body.usuario,
        contrasena: req.body.contrasena,
        correo: req.body.correo
    };
    await User.update({_id: req.params.id}, {$set: usuario });
    res.json({status: 'Usuario actualizado'});
}

usuariosCtrl.register = (req, res, next) => {
    var user = new User();
    user.name = req.body.name;
    user.usuario = req.body.usuario;
    user.contrasena = req.body.contrasena;
    user.correo = req.body.correo;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

usuariosCtrl.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

usuariosCtrl.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            //console.log(user);
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['name','correo']) });
        }
    );
}

module.exports = usuariosCtrl;