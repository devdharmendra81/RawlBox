var LocalStrategy = require('passport-local').Strategy;
var con = require('../config/mysqlDB');
var bcrypt = require('bcrypt-nodejs');

module.exports = function (passport) {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        var sql = 'select * from user where username = "' + user[0].username + '";';
        con.query(sql, function (err, user) {
            if (err) {
              return done(err, null);
            } 
            done(null, user[0]);
        });
    });

    passport.use(new LocalStrategy(function(username, password, done) {
        var sql = 'select * from user where username = "' + username + '";';
        con.query(sql, function (err, user) {
            if (err) {
              return done(err, false, {message: 'Runtime error occurred '+ err});
            } 
            if(typeof user ==='undefined' || user.length === 0) {
                return done(null, false, {message: 'Invalid username'});
            } else {
                bcrypt.compare(password, user[0].password, function(err, valid){
                  if(!valid){
                    return done(null, false, {message: 'Invalid password'})  
                   }else {
                    return done(null, user);
                   }
                }); 
            }
        });
    }));
};
