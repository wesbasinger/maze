var express = require('express');
var app = express();

app.use(express.static('public'))

var port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.listen(port, function() {
	console.log('Listening on port ' + port);
});
