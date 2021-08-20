const fetch = require('node-fetch');

module.exports = {
	name: 'meme',
	minArgs: 0,
	botOwnerOnly: false,
	requiredUserPerms: [],
	cooldown: 2,
	description: "Get a meme from reddit!",
	usage: '',
	execute(message, args, logger, config, client) {

		fetch("https://meme-api.herokuapp.com/gimme")
			.then(res => res.json())
			.then(json => {
				if (json.nsfw) return message.channel.send(`Sorry <@!${message.author.id}>, but the meme I recieved was NSFW`);

				let embed = new client.Embed()
					.setColor("#00FF00")
					.setTitle(json.title)
					.setURL(json.postLink)
					.setDescription(`Source: meme-api.herokuapp.com\n**Posted by ${json.author} on the ${json.subreddit} subreddit.**`)
					.setImage(json.url)
					.setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL());
				message.channel.send(embed);
			})
			.catch(err => logger.error(err));
	},
};
