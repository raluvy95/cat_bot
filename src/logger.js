const fs = require('fs');
const yaml = require('js-yaml');
const config = yaml.load(fs.readFileSync('./config.yml', 'utf8'));
const c = require('ansi-colors');

c.enabled = config.colourfulConsole;

function log(logType, colour, rawLogLine) {
	let currentDate = new Date();
	let cDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
	let cTime = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
	let dateTime = cDate + ' ' + cTime;
	var logLine = `[${dateTime} | ${logType}]: ${rawLogLine}`;

	console.log(c[colour](logLine));
};


function info(rawLogLine) {
	log("INFO", "white", rawLogLine);
};

function warn(rawLogLine) {
	log("WARN", "yellowBright", rawLogLine);
};

function error(rawLogLine) {
	log("ERROR", "red", rawLogLine);
};

function debug(rawLogLine, debugLevel) {
	if (debugLevel > config.debugLevel) return;
	log("DEBUG", "green", rawLogLine);
};

function fatal(rawLogLine) {
	log("FATAL", "red", rawLogLine);
};


module.exports = { info, warn, error, debug, fatal };
