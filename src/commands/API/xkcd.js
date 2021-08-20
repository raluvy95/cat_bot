const fetch = require('node-fetch');

module.exports = {
	name: 'xkcd',
	minArgs: 0,
	botOwnerOnly: false,
	requiredUserPerms: [],
	cooldown: 2,
	description: "Get a random post from xkcd.com",
	usage: '',
	execute(message, args, logger, config, client) {

		const xkcdLatest = require("../../../cache/xkcdLatest.json");

		let url = `https://xkcd.com/${Math.floor(Math.random() * xkcdLatest.num) + 1}/info.0.json`;

		fetch(url)
			.then(res => res.json())
			.then(json => {
				let embed = new client.Embed()
					.setColor("#00FF00")
					.setTitle(json.title)
					.setDescription("Source: xkcd.com")
					.setImage(json.img)
					.setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL());
				message.channel.send(embed);
			})
			.catch(err => logger.error(err));
	},
};
