var request = require('request');
var config = require('../config.js');

var URL_BEGINNING = 'http://api.openweathermap.org/data/2.5/weather?';
var API_KEY = config.openweathermap.apiKey;
var URL_END = '&units=imperial&appid=' + API_KEY;

function getWeatherFromCity(city) {
	return new Promise(function(resolve, reject) {
		var cityEncoded = encodeURIComponent(city);
		var urlFull = URL_BEGINNING + 'q=' + cityEncoded + URL_END;

		request({
			url: urlFull,
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

function getWeatherFromZip(zip) {
	return new Promise(function(resolve, reject) {
		var urlFull = URL_BEGINNING + 'zip=' + zip + URL_END;

		request({
			url: urlFull,
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

function logTemperature(data) {
	if (data.cod === 200) {
		console.log('Success.');
		console.log('It is currently ' + data.main.temp + '\u00B0F in ' + data.name + '.');
	} else {
		console.log(data.message);
	}
}

module.exports = {
	getWeatherFromCity: getWeatherFromCity,
	getWeatherFromZip: getWeatherFromZip,
	logTemperature: logTemperature
};