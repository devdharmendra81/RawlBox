var express = require('express');
var controller = require('./upload.controller');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'server/uploads/dxf')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage });

var router = express.Router();

router.post('/uploadFile', upload.array('attachment',20), controller.uploadFile);
router.get('/getUploadedFileByUser', controller.getUploadedFileByUser);
module.exports = router;