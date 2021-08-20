const fs = require("fs");
const cacheXkcdLatest = require('./features/cacheXkcdLatest.js');
const blacklistStrings = require('./features/blacklistStrings.js');

module.exports = {
	execute(logger, config) {

		if (!fs.existsSync("./data/dynamic/")) {
			fs.mkdirSync("./data/dynamic/");
		};

		if (!fs.existsSync("./cache/")) {
			fs.mkdirSync("./cache/");
		};

		if (config.enabledFeatures.blacklistStrings) blacklistStrings.RunAtStartup(logger, config);

		cacheXkcdLatest.execute(logger, config);

	},
};
