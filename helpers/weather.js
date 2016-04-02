var request = require('request');
var config = require('../config.js');

var URL_BEGINNING = 'http://api.openweathermap.org/data/2.5/weather?';
var API_KEY = config.openweathermap.apiKey;
var URL_END = '&units=imperial&appid=' + API_KEY;

function getWeatherFromCity(city, callback) {
	var cityEncoded = encodeURIComponent(city);
	var urlFull = URL_BEGINNING + 'q=' + cityEncoded + URL_END;

	request({
		url: urlFull,
		json: true
	}, function(error, response, body) {
		callback(error, body);
	});
}

function getWeatherFromZip(zip, callback) {
	var urlFull = URL_BEGINNING + 'zip=' + zip + URL_END;

	request({
		url: urlFull,
		json: true
	}, function(error, response, body) {
		callback(error, body);
	});
}

module.exports = {
	getWeatherFromCity: getWeatherFromCity,
	getWeatherFromZip: getWeatherFromZip
};