module.exports = {
	name: 'dice',
	minArgs: 0,
	botOwnerOnly: false,
	requiredUserPerms: [],
	cooldown: 1,
	description: "Get two random numbers between 1 and 6",
	usage: '',
	execute(message, args, logger, config, client) {

		message.reply(`The dice landed on ${Math.floor(Math.random() * 6) + 1} and ${Math.floor(Math.random() * 6) + 1}`);

	},
};
