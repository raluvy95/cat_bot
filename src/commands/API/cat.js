const fetch = require('node-fetch');

module.exports = {
	name: 'cat',
	minArgs: 0,
	botOwnerOnly: false,
	requiredUserPerms: [],
	cooldown: 2,
	description: "Get an image of a cat!",
    usage: '',
	execute(message, args, logger, config, client) {

		fetch("https://api.thecatapi.com/v1/images/search")
			.then(res => res.json())
			.then(json => {
				let embed = new client.Embed()
					.setColor("#00FF00")
					.setTitle("Here's a cat!")
					.setDescription("Source: thecatapi.com")
					.setImage(json[0].url)
					.setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL());
				message.channel.send({embeds: [embed]});
			})
            .catch(err => logger.error(err));
	},
};
