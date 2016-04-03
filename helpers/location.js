var request = require('request');
var URL = 'http://ipinfo.io';

function getLocation() {
	return new Promise(function(resolve, reject) {
		request({
			url: URL,
			json: true
		}, function(error, response, body) {
			if (error) {
				reject(error);
			} else {
				resolve(body);
			}
		});
	});
}

module.exports = {
	getLocation: getLocation
};