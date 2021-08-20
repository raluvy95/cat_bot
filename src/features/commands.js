module.exports = {
	execute(message, logger, config, client) {

		const args = message.content.slice(config.cmdPrefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();

		if (!client.commands.has(commandName)) return;

		const command = client.commands.get(commandName);

		if (!client.cmdCooldowns.has(command.name)) {
			client.cmdCooldowns.set(command.name, new client.cmdCooldown);
		};

		const now = Date.now();
		const timestamps = client.cmdCooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.react(config.emojis.slowDown);
			};
		};

		if (command.botOwnerOnly && message.author.id != config.botOwnerId) return message.reply("Only the bot owner is allowed to run this command.");

		if (!message.member.hasPermission(command.requiredUserPerms)) return message.reply("Sorry, but you don't have permission to run this command.");

		if (command.minArgs > args.length) return message.channel.send(`This command requires ${command.minArgs} arguments but you only supplied ${args.length}.`);

		try {
			command.execute(message, args, logger, config, client);
			logger.debug(`CMD RAN | User: ${message.author.id} | Guild: ${message.guild.id} | Cmd: ${message}`, 3)
		} catch (error) {
			logger.error(`An error occured while a user tried to run the command: ${message}\nError: ${error}`)
			message.reply('Sorry, but the was an error trying to execute that command.');
		};

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	},
};
