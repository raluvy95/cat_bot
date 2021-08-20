const fs = require('fs');
let Parser = require('rss-parser');
let parser = new Parser();

module.exports = {
	execute(logger, config, client) {

		let previousVidId;

		fs.open('./data/dynamic/ytNotifsPreviousVidId.json', 'r', function (err, fd) {
			if (err) {
				fs.writeFile('./data/dynamic/ytNotifsPreviousVidId.json', '[]', function (err) {
					if (err) {
						logger.error(err);
					};
					logger.info("File ./data/dynamic/ytNotifsPreviousVidId.json didn't exist so was created");
				});
			} else {
				logger.debug("File ./data/dynamic/ytNotifsPreviousVidId.json already exists so was not created", 1);
			};
		});

		setTimeout(() => {
			previousVidId = require('../../data/dynamic/ytNotifsPreviousVidId.json');
			setInterval(function () {

				logger.debug("ytNotifs checking for new vid...", 4);
				parser.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${config.ytNotifs.ytChannelId}`)
					.then(vidsJson => {

						if (vidsJson.items[0].id != previousVidId[0]) {
							logger.debug("ytNotifs found a new video", 4);
							let notifMsg = config.ytNotifs.notifMsg;
							notifMsg = notifMsg.replace("{author}", vidsJson.items[0].author);
							notifMsg = notifMsg.replace("{url}", vidsJson.items[0].link);
							logger.debug(`ytNotifs constructed message:\n\t${notifMsg.replace("\n", "\n\t")}\nFrom:\n\t${config.ytNotifs.notifMsg.replace("\n", "\n\t")}`, 4);
							try {
								client.channels.cache.get(config.ytNotifs.notifsChannelId).send(notifMsg);
							} catch (err) {
								logger.error("ytNoifs failed to send Youtube notification message!\n" + err);
							};

							previousVidId[0] = vidsJson.items[0].id;
							fs.writeFile('./data/dynamic/ytNotifsPreviousVidId.json', JSON.stringify(previousVidId), 'utf8', function (err) {
								if (err) return logger.error(err);
							});

						} else {
							logger.debug("ytNotifs could not find a new vid", 4);
						};

					})
					.catch(err => {
						logger.error(`ytNotifs failed to collect or parse data from https://www.youtube.com/feeds/videos.xml?channel_id=${config.ytChannelId}\n${err}`);
					});

			}, config.ytNotifs.newVidCheckIntervalInMinutes * 60000);

		}, 1000);

	},
};
