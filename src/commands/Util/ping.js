module.exports = {
	name: 'ping',
	minArgs: 0,
	botOwnerOnly: false,
	requiredUserPerms: [],
	cooldown: 1,
	description: "See the bot's latency or check it is responding",
	usage: '',
	execute(message, args, logger, config, client) {

		message.reply(`Latency: ${Date.now() - message.createdTimestamp}ms.`);

	},
};
