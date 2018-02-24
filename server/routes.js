module.exports = function(app, passport) {
    app.use('/api/user', require('./api/user'));
    app.use('/api/upload', require('./api/upload'));
};
