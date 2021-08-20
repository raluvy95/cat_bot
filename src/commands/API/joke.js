const fetch = require('node-fetch');

module.exports = {
	name: 'joke',
	minArgs: 0,
	botOwnerOnly: false,
	requiredUserPerms: [],
	cooldown: 2,
	description: "Get a joke!",
	usage: '',
	execute(message, args, logger, config, client) {

		fetch(config.urls.jokeapi)
			.then(res => res.json())
			.then(json => {
				if (json.error) {
					return message.reply("Sorry, but the API said the was an error");
				};
				let embed = new client.Embed()
					.setColor("#00FF00")
					.setTitle("Joke!")
					.setDescription("Source: jokeapi.dev")
					.setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL());
				if (json.type == "single") {
					embed.addField(json.joke, "\u200b");
				} else embed.addField(json.setup, `||${json.delivery}||`);
				message.channel.send(embed);
			})
			.catch(err => logger.error(err));
	},
};
