const fetch = require('node-fetch');

module.exports = {
	name: 'clickbait',
	minArgs: 0,
	botOwnerOnly: false,
	requiredUserPerms: [],
	cooldown: 2,
	description: "Get a clickbait title!",
	usage: '',
	execute(message, args, logger, config, client) {

		fetch("https://clickbait-generator.herokuapp.com/api")
			.then(res => res.json())
			.then(json => {
				let embed = new client.Embed()
					.setColor("#00FF00")
					.setTitle(`${json.title}`)
					.setDescription("Source: clickbait-generator.herokuapp.com")
					.setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL());
				message.channel.send(embed);
			})
			.catch(err => logger.error(err));
	},
};
