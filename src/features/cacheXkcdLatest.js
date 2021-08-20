const fs = require('fs');
const fetch = require('node-fetch');

module.exports = {
	execute(logger, config) {

		fs.open('./cache/xkcdLatest.json', 'r', function (err, fd) {
			if (err) {
				fs.writeFile('./cache/xkcdLatest.json', '{}', function (err) {
					if (err) {
						logger.error(err);
					};
					logger.info("File ./cache/xkcdLatest.json didn't exist so was created");
				});
			} else {
				logger.debug("File ./cache/xkcdLatest.json already exists so was not created", 1);
			};
		});

		fetch("https://xkcd.com/info.0.json")
			.then(res => res.json())
			.then(json => {
				fs.writeFile('./cache/xkcdLatest.json', JSON.stringify(json), 'utf8', function (err) {
					if (err) return logger.error(err);
				});
			})
			.catch(err => logger.error(err));
	},
};
