var express = require('express');
var app = express();
app.use(function(req, res, next) {
	if (req.url === '/maps') {
		req.url = '/';
	}
	next();
});

app.use('/', express.static(__dirname));
app.listen(3000);