var con = require('../../config/mysqlDB');

var uploadFile = function(req, res){
    var requestBody = req.body;
    var sqlQuery = '';
    if (req.files.length !== 0) {
        var pathArray = [];
        for(var i=0; i<req.files.length; i++){
            sqlQuery += 'INSERT INTO fileuploads (fileName, username) VALUES ("' + req.files[i].originalname + '", "'+ requestBody.username +'");';
        }
    }
    con.query(sqlQuery, function (err, result) {
        if(err){
            res.send({'message':'Runtime error occurred during file upload '+ err});
        } else {
            res.status('201');
            res.send({
                'message': 'file uploaded successfully',
                'files': req.files
            });
        }
         
    });
};

var getUploadedFileByUser = function (req, res){
    var sqlQuery = "SELECT * FROM fileuploads where username = '" + req.query.username +
        "' ORDER BY created_at DESC;";

    con.query(sqlQuery, function (err, result) {
        if (err) {
            res.status('500');
            res.send(err);
        }
        else if (typeof result === 'undefined' || result.length === 0) {
            res.status('204');
            res.send({message: 'No files are uploaded by this user'});
        } else {
            res.status('200');
            res.send(result);
        }
    });
}

module.exports = {
    uploadFile: uploadFile,
    getUploadedFileByUser : getUploadedFileByUser
};
