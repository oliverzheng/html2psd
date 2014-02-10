var page = require('webpage').create();

var dump = require('./dump');

page.open('http://google.com/', function () {
	page.includeJs('http://localhost:8000/jquery-2.0.2.min.js', function() {
		var result = page.evaluate(dump.serialize);
		console.log(JSON.stringify(result, null, '\t'));
		phantom.exit();
	});
});
