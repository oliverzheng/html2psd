var phantom = require('node-phantom');
var dump = require('./dump');

phantom.create(function(err, ph) {
	if (err) return console.log('Phantom create error', err);

	ph.createPage(function(err, page) {
		if (err) return console.log('Page error', err);

		page.set('viewportSize', { width: 480, height: 800 }, function() {

			page.open('http://localhost:8000/test.html', function(err, status) {
				if (err) return console.log('open error', err);

				page.includeJs('http://localhost:8000/jquery-2.0.2.min.js', function(err) {
					if (err) return console.log('includejs err', err);

					page.evaluate(dump.serialize, function(err, result) {
						if (err) return console.log('eval err', err);

						console.log(result);

						ph.exit();
					});
				});
			});
		});
	});
});
