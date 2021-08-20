const fetch = require('node-fetch');

module.exports = {
	name: 'bored',
	minArgs: 0,
	botOwnerOnly: false,
	requiredUserPerms: [],
	cooldown: 2,
	description: "Bored? Find something to do with this command!",
	usage: '',
	execute(message, args, logger, config, client) {

		fetch("http://www.boredapi.com/api/activity/")
			.then(res => res.json())
			.then(json => {
				let embed = new client.Embed()
					.setColor("#00FF00")
					.setTitle(`${json.activity}`)
					.setDescription("Source: boredapi.com")
					.addFields(
						{ name: "Type:", value: json.type },
						{ name: "Participants:", value: json.participants }
					)
					.setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL());
				message.channel.send(embed);
			})
			.catch(err => logger.error(err));
	},
};
