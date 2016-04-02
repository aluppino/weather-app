var weather = require('./weather.js');
var location = require('./location.js');

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

var command = argv._[0];

if (typeof argv.city === 'string' && argv.city.length > 0) {
	weather.getWeatherFromCity(argv.city, function(error, weather) {
		if (error) {
			console.log('Error getting weather at \'' + argv.city + '\'.');
			return;
		}

		if (weather.cod !== 200) {
			console.log(weather.message);
			return;
		}
		
		console.log('It is currently ' + weather.main.temp + '\u00B0F in ' + weather.name + '.');
	});
} else if (typeof argv.zip === 'number') {
	weather.getWeatherFromZip(argv.zip, function(error, weather) {
		if (error) {
			console.log('Error getting weather at \'' + argv.zip + '\'.');
			return;
		}

		if (weather.cod !== 200) {
			console.log(weather.message);
			return;
		}
		
		console.log('It is currently ' + weather.main.temp + '\u00B0F in ' + weather.name + '.');
	});
} else {
	var currentLocation;
	location.getLocation(function(error, city) {
		if (error) {
			console.log('Location not provided; unable to get current location.');
			return;
		}

		currentLocation = city.postal;
		weather.getWeatherFromZip(currentLocation, function(error, weather) {
			if (error) {
				console.log('Error getting weather at \'' + currentLocation + '\'.');
				return;
			}

			if (weather.cod !== 200) {
				console.log(weather.message);
				return;
			}
			
			console.log('It is currently ' + weather.main.temp + '\u00B0F in ' + weather.name + '.');
		});
	});
}