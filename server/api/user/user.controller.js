var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var con = require('../../config/mysqlDB');

var signIn = function (req, res, next) {
    passport.authenticate('local', { successRedirect: '/',
        failureRedirect: '/signin'}, function(err, user, info) {
        if(err) {
            res.status('500');
            res.send({'message':err.message});
        }
       
        if(!user) {
            res.status('400');
            res.send({'message': info.message});
            return;
        }
        return req.logIn(user, function(err) {
            if(err) {
                res.status('404');
                res.send({'message': err.message});
            } else {
                res.status('200');
                res.send({
                    'message': 'log in success',
                    'username': user[0].username
                });
            }
        });
    })(req, res, next);
};

var signUp = function (req, res, next) {
    var userObj = req.body;
    var sql = 'select * from user where username = "'+ userObj.username + '";';
    con.query(sql, function (err, user) {
        if(err) {
            res.status('500');
            res.send({'message':'Runtime error occurred '+ err});
        } 
        if(user.length !== 0) {
            res.status('400');
            res.send({'message':'Username already exist'});
        } else {
            var password = userObj.password;
            var hash = bcrypt.hashSync(password);

            var sql = 'INSERT INTO user (username, password, name) VALUES ("' + userObj.username + '", "' + hash + '", "'+ userObj.fullName +'");';
            con.query(sql, function (err, user) {
                if(err){
                    res.send({'message':'Runtime error occurred during sign up'+ err});
                } else {
                    signIn(req, res, next);
                }
                 
            });
        }
    });
};

var getUser = function(req,res) {
    return res.send(req.user);
};

var logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
};

module.exports = {
    signIn: signIn,
    signUp: signUp,
    getUser: getUser,
    logout: logout
};
