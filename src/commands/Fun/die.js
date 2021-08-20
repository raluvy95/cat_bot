module.exports = {
	name: 'die',
	minArgs: 0,
	botOwnerOnly: false,
	requiredUserPerms: [],
	cooldown: 1,
	description: "Get a random number between 1 and 6",
	usage: '',
	execute(message, args, logger, config, client) {

		message.reply(`The die landed on ${Math.floor(Math.random() * 6) + 1}`);

	},
};
