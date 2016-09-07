var $ = require('jquery');
var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/upload', function(req, res) {
    // this creates the incoming form object
    var form = new formidable.IncomingForm();
    
    //this stores the uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/uploads');
    
    //this will rename a successfully loaded file into its original name
    form.on('file', function(field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });
    
    //log errors
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });
    
    //send response to client once all files have been uploaded
    form.on('end', function() {
        res.end('success');
    });
    
    //parses incoming request containing the form data
    form.parse(req);
});


app.listen(process.env.PORT || 8080, function () {
  console.log('Server has been started');
});