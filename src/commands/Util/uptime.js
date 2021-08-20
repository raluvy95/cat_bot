module.exports = {
	name: 'uptime',
	minArgs: 0,
	botOwnerOnly: false,
	requiredUserPerms: [],
	cooldown: 2,
	description: "See the bot's uptime",
	usage: '',
	execute(message, args, logger, config, client) {

		function roundUp(num, precision) {
			precision = Math.pow(10, precision);
			return Math.ceil(num * precision) / precision;
		};

		var totalSeconds = (client.uptime / 1000);
		var days = Math.floor(totalSeconds / 86400);
		var hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		var minutes = Math.floor(totalSeconds / 60);
		var seconds = roundUp(totalSeconds % 60, 0);

		message.reply(`I have been online for ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds.`);

	},
};