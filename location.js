var request = require('request');
var url = 'http://ipinfo.io';

function getLocation(callback) {
	request({
		url: url,
		json: true
	}, function(error, response, body) {
		callback(error, body);
	});
}

module.exports = {
	getLocation: getLocation
};