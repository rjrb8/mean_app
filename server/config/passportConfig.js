const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

//var User = mongoose.model('Usuarios');
var User = mongoose.model('User');
//const users = new Users();

passport.use(
     new localStrategy({ usernameField: 'usuario', passwordField: 'contrasena' },
     async (username, password, done) => {
        await User.findOne({ usuario: username },
        (err, user) => {
          console.log(user);
          if (err) return done(err);
          else if (!user) 
            return done(null, false, { message: 'Ud no es un usuario' });
          else if (!user.verifyPassword(password))
            return done(null, false, { message: 'Su clave es incorrecta' });
          else 
            return done(null, user);
        })
      })
    )