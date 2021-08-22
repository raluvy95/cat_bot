const fs = require('fs');

module.exports = {
	name: 'help',
	minArgs: 0,
	botOwnerOnly: false,
	requiredUserPerms: [],
	cooldown: 2,
	description: "Get a list of commands or info about a specific command",
	usage: '<(optional) command name>',
	execute(message, args, logger, config, client) {
		if (args.length == 0) {
			let embed = new client.Embed()
				.setColor("#00FF00")
				.setTitle("Commands")
				.setDescription(`Do \`${config.cmdPrefix}help <command name>\` for help with a specific command`)
				.setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL());

			const commandDirs = fs.readdirSync('./src/commands');
			commandDirs.forEach(newCategory);
			function newCategory(item) {
				var commandFiles = fs.readdirSync(`./src/commands/${item}`).filter(file => file.endsWith('.js'));
				commandFiles.forEach(formatCmd);
				function formatCmd(item, index) {
					commandFiles[index] = item.slice(0, -3);
					commandFiles[index] = "`" + config.cmdPrefix + commandFiles[index] + "`";
				};
				embed.addField(item, commandFiles.join(', '));
			};

			message.channel.send({embeds: [embed]});
		} else {
			if (!client.commands.has(args[0].toLowerCase())) return message.channel.send(`Sorry <@!${message.author.id}>, but that command doesn't exist.`);

			const command = client.commands.get(args[0].toLowerCase());

			let embed = new client.Embed()
				.setColor("#00FF00")
				.setTitle(`${command.name} command:`)
				.setDescription(command.description)
				.addFields(
					{ name: "Usage:", value: `\`${config.cmdPrefix}${command.name} ${command.usage}\`` },
					{ name: "Minimum args:", value: command.minArgs?.toString() },
					{ name: "Cooldown:", value: `${command.cooldown} seconds` }
				)
				.setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL());
			message.channel.send({embeds: [embed]});

		};

	},
};
