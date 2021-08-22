const fetch = require('node-fetch');

module.exports = {
	name: 'reddit',
	minArgs: 1,
	botOwnerOnly: false,
	requiredUserPerms: [],
	cooldown: 2,
	description: "Get a post from a subreddit",
	usage: '<subreddit>',
	execute(message, args, logger, config, client) {

		var subreddit = args[0];
		if (subreddit.toLowerCase().startsWith("r/")) subreddit = subreddit.slice(2);

		fetch(`https://www.reddit.com/r/${subreddit}/hot.json`)
			.then(res => res.json())
			.then(json => {
				if (json.error) return message.channel.send(`Sorry <@!${message.author.id}>, but the was an error: ${json.message}`);
				if (!json.data.children[0]) return message.channel.send(`Sorry <@!${message.author.id}>, but that subreddit is empty or doesn't exist.`);

				var postNum = Math.floor(Math.random() * json.data.children.length);
				var post = json.data.children[postNum].data;

				if (post.over_18 && !message.channel.nsfw) return message.channel.send(`Sorry <@!${message.author.id}>, but the message I was going to send is NSFW, please move into an NSFW channel.`);

				if (post.url.endsWith(".gifv") && post.domain == "imgur.com") post.url = post.url.slice(0, 1)

				let embed = new client.Embed()
					.setColor("#FF5700")
					.setTitle(post.title)
					.setURL(`https://reddit.com${post.permalink}`)
					.setDescription(`Source: reddit.com\n**Posted by ${post.author} on the ${post.subreddit_name_prefixed} subreddit.**`)
					.setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL());
				if (post.is_video || post.domain == "youtube.com" || post.domain == "youtu.be") {
					embed.setImage(post.thumbnail);
				} else embed.setImage(post.url);
				message.channel.send({embeds: [embed]});
			})
			.catch(err => logger.error(err));
	},
};
