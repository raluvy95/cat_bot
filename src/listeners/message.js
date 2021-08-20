const commands = require('../features/commands.js');
const antiDisboard = require('../features/antiDisboard.js');
const sudo = require('../features/sudo.js');
const blacklistStrings = require('../features/blacklistStrings.js');

module.exports = {
	name: 'message',
	execute(message, logger, config, client) {

		if (config.enabledFeatures.blacklistStrings) blacklistStrings.Message(message, logger, config, client);

		if (message.author.bot || message.webhookID) return;

		if (message.channel.type === 'dm') return;

		if (message.content.toLowerCase().startsWith("ree") && config.enabledFeatures.reeReplier) return message.channel.send("REEEEEEEEE"); // reeReply feature

		if (message.content.toLowerCase().startsWith("!d ") && config.enabledFeatures.antiDisboard) return antiDisboard.execute(message, logger, config, client);

		if (message.content.toLowerCase().startsWith("sudo ") && config.enabledFeatures.sudo) return sudo.execute(message, logger, config, client);

		if (!message.content.startsWith(config.cmdPrefix)) return;

		commands.execute(message, logger, config, client);

	},
};
