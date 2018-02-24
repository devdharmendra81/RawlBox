var mysql = require('mysql');
var settings = require('../settings');

var con = mysql.createConnection({
    host: settings.database.host,
    user: settings.database.user,
    password: settings.database.password,
    database: settings.database.databaseName,
    charset: settings.database.charset,
    dateStrings : true,
    multipleStatements: true
});

module.exports = con;