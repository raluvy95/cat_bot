module.exports = {
	execute(message, logger, config, client) {

		if (message.content.toLowerCase().startsWith("!d bump")) {
			let embed = new client.Embed()
				.setColor("#00FFFF")
				.setTitle("DISBOARD: The Public Server List")
				.setURL("https://disboard.org/")
				.setDescription(`<@!${message.author.id}>,\nBump done :thumbsup:\nCheck it on DISBOARD: https://disboard.org/`)
				.setImage("https://disboard.org/images/bot-command-image-bump.png");
			message.channel.send(embed);
		} else {
			message.reply("No more Disboard.");
		};

		const disboardId = "302050872383242240";
		setTimeout(() => {
			const lastMsg = message.channel.messages.cache
				.filter(m => m.author.id == disboardId)
				.last();
			if (!lastMsg) return;
			lastMsg.delete();
		}, 1000);

	},
};