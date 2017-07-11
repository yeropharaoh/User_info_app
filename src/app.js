var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express()

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));

//Part 0
app.get('/', function (req, res) {
	fs.readFile('../users.json', function (error, data) {
		if (error) {
			console.log(error);
		}
		var parsedData = JSON.parse(data);
		console.log(parsedData);
		res.render('index', {Users: parsedData});
	});
});

//Part 1.A
app.get('/search', function (req, res) {
    res.render('pug-searchform');
});

app.post('/search', function (req, res) {
		res.render('pug-searchform');
});

//Part 1.B
app.post('/match', function(req,res){
	console.log(req.body.name);
	
	fs.readfile('../users.json', 'utf8', function (error, data) {
		if (error) {
			throw error;
		}
		var parsedData = JSON.parse(data);
		console.log(parsedData);
		
		for(var i = 0; i < parsedData.length; i++) {
			if((req.body.name === parsedData[i].firstname) || (req.body.name === parsedData[i].lastname)) { 
				var result = parsedData[i].firstname + ' ' + parsedData[i].lastname;
			}
		}
		console.log(result);
		res.render('pug-match', {Users: result});
	});
});

//Part2.A
app.get('/form', function(req, res){
	res.render('pug-form')
});
	
app.post('/forminfo', function(req, res){
	console.log(req.body);

	fs.readFile('../users.json', 'utf8', function(err, data){
		if (err){
	 	throw err;
		} 

	var parsedData = JSON.parse(data); 
	var newUserData = req.body;

	parsedData.push(newUserData);
	console.log(parsedData);

	var completeusers = JSON.stringify(parsedData);
	console.log(completeusers);

//Part2.B
fs.writeFile('../users.json', 'utf8', function(err, data){
			if(err){
				throw err;
			}
			res.redirect('/');
		});
	});

});

app.listen(3000, function(){
	console.log('Listening on port 3000');
});











// 	if(requestParameters.firstname!==undefined&&requestParameters.lastname!==undefined){
// 		res.send('<body><h1> Hallo' + requestParameters.firstname + '' + requestParameters.lastname '</h1><body>')
// 	}
// 	else{
// 		res.send('you did not enter a name');
// 	}
// });

// app.post('/match', function(req,res){
// 	console.log(req.body);
// 	res.redirect('/match')
// })

// app.use(bodyParser.json());


// app.use(express.static('../public'));



// app.get('/', function (req, res){
// 	res.render('index');
// });

// console.log("post request received");
	// console.log(request.body);
	// response.render('/Form');
	// response.send('data received: ' + JSON.stringify(request.body) + '\n');