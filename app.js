var weather = require('./helpers/weather.js');
var location = require('./helpers/location.js');

var argv = require('yargs')
	.option({
		city: {
			demand: false,
			alias: 'c',
			description: 'City you want the weather for',
			type: 'string'
		},
		zip: {
			demand: false,
			alias: 'z',
			description: 'Zip code you want the weather for',
			type: 'number'
		}
	})
	.help('help')
	.argv;

console.log('*** STARTING WEATHER APP ***\n');

if (typeof argv.city === 'string' && argv.city.length > 0) {
	console.log('*** Attempting to get temperature in city ' + argv.city + '...');
	weather.getWeatherFromCity(argv.city).then(function(data) {
		weather.logTemperature(data);
	}, function(error) {
		console.log(error);
	});
} else if (typeof argv.zip === 'number') {
	console.log('*** Attempting to get temperature in zip code ' + argv.zip + '...');
	weather.getWeatherFromZip(argv.zip).then(function(data) {
		weather.logTemperature(data);
	}, function(error) {
		console.log(error);
	});	
} else {
	console.log('*** Attempting to get current location...');
	location.getLocation().then(function(data) {
		var currentLocation = data.postal;
		console.log('Success.');
		console.log('Current location is ' + currentLocation + '.\n');
		console.log('*** Attempting to get temperature in zip code ' + currentLocation + '...');
		weather.getWeatherFromZip(currentLocation).then(function(data) {
			weather.logTemperature(data);
		}, function(error) {
			console.log(error);
		});
	}, function(error) {
		console.log(error);
	});
}