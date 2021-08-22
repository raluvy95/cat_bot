const fs = require('fs');
const fetch = require('node-fetch');

function RunAtStartup(logger, config) {

	fetch("https://api.github.com/gists/"+config.blacklistStrings.gistId)
		.then(res => res.json())
		.then(json => {
			if(json.message && json.message == "Not found") return logger.debug("The blacklistStrings' gist is not found...");
			fs.writeFile('./cache/blacklistedStrings.json', json.files[config.blacklistStrings.filename].content, 'utf8', function (err) {
				if (err) return logger.error(err);
			});
		});

};

function Message(message, logger, config, client) {

	let blacklistedStrings = require('../../cache/blacklistedStrings.json');

	blacklistedStrings.forEach(item => {
		if (message.content.toLowerCase().includes(item)) return handler(item);
	});

	function handler(item) {
		message.delete();
		message.channel.send(config.blacklistStrings.replyMsg.replace("{user}", "<@!"+message.author.id+'>'));
	};

};

module.exports = { RunAtStartup, Message };