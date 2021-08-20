const fetch = require('node-fetch');

module.exports = {
	name: 'ip',
	minArgs: 1,
	botOwnerOnly: false,
	requiredUserPerms: [],
	cooldown: 2,
	description: "Get information about an IP address",
	usage: '<ip address>',
	execute(message, args, logger, config, client) {

		fetch(`https://ipinfo.io/${encodeURIComponent(args[0])}/json`)
			.then(res => res.json())
			.then(json => {
				if (json.status == 404) return message.reply("That IP does not exist.");
				if (json.bogon) return message.reply("That IP is a bogon.");
				let embed = new client.Embed()
					.setColor("#00FF00")
					.setTitle(`IP info for ${json.ip}`)
					.setDescription("Source: ipinfo.io")
					.addFields(
						{ name: "City:", value: json.city },
						{ name: "Region:", value: json.region },
						{ name: "Country:", value: json.country },
						{ name: "Location:", value: json.loc },
						{ name: "Organisation:", value: json.org }
					)
					.setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL());
				message.channel.send(embed);
			})
			.catch(err => logger.error(err));
	},
};
