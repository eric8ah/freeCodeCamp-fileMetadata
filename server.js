var express = require('express');
var app = express();
var path = require('path');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads');
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});
var upload = multer({ storage: storage}).single('fileUpload');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/api/upload', function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            return res.end('Error uploading file.');
        }
        var response = {size: req.file.size};
        res.json(response);
    });
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Server has been started');
});