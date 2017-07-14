var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express()

app.set('views', './views');
app.set('view engine', 'pug');

app.use("/", bodyParser.urlencoded({ extended: true }));

//Part 0
app.get('/', function(req, res) {
    fs.readFile('../users.json', function(error, data) {
        if (error) {
            console.log(error);
        }
        var parsedData = JSON.parse(data);
        // console.log(parsedData);
        res.render('index', { Users: parsedData });
    });
});

//Part 1.A
app.get('/search', function(req, res) {
    res.render('pug-searchform');
});

//Part 1.B
app.post('/match', function(req, res) {

    fs.readFile('../users.json', 'utf8', function(error, data) {
        if (error) {
            throw error;
        }
        var parsedData = JSON.parse(data);
        console.log(parsedData);

        for (var i = 0; i < parsedData.length; i++) {
            if(req.body.search === parsedData[i].firstname || req.body.search===parsedData[i].lastname){
		            
            var person = parsedData[i];   
			console.log(parsedData[i]);
		}
     };
     res.render('pug-match', {Users: person});
});
});

//Part2.A
app.get('/form', function(req, res) {
    res.render('pug-form')
});

//Part2.B	
app.post('/forminfo', function(req, res) {
    console.log(req.body);

    fs.readFile('../users.json', 'utf8', function(err, data) {
        if (err) {
            throw err;
        }

        var parsedData = JSON.parse(data);
        var newUserData = {firstname: req.body.fname,
                            lastname: req.body.lname,
                            email: req.body.email
                            } 

        parsedData.push(newUserData);
        console.log(newUserData);

        var completeusers = JSON.stringify(parsedData);
        console.log(completeusers);

        fs.writeFile('../users.json', completeusers, 'utf8', function(err, data) {
            if (err) {
                throw err;
            }
        });
    });
    res.redirect('/');
});

app.listen(3000, function() {
    console.log('Listening on port 3000');
});