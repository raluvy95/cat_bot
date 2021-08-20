module.exports = {
	name: 'delprev',
	minArgs: 0,
	botOwnerOnly: true,
	requiredUserPerms: [],
	cooldown: 0,
	description: "Delete the previous message I sent",
	usage: '',
	execute(message, args, logger, config, client) {

		const lastMsg = message.channel.messages.cache
			.filter(m => m.author.id == client.user.id)
			.last()
		if (!lastMsg) return;
		lastMsg.delete();
		message.react(config.emojis.ok);

	},
};
