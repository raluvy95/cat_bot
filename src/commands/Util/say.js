module.exports = {
	name: 'say',
	minArgs: 1,
	botOwnerOnly: true,
	requiredUserPerms: [],
	cooldown: 0,
	description: "Make me send a message",
	usage: '<message>',
	execute(message, args, logger, config, client) {

		message.delete();
		message.channel.send(args.join(' '));

	},
};
