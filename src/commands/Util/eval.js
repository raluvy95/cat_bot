module.exports = {
	name: 'eval',
	minArgs: 1,
	botOwnerOnly: true,
	requiredUserPerms: [],
	cooldown: 0,
	description: "Run an eval",
	usage: '<eval code>',
	execute(message, args, logger, config, client) {

		let code = args.join(' ');
		if (code.startsWith("```js")) code = code.slice(5);
		if (code.endsWith("```")) code = code.slice(0, -3);
		try {
			let evaled = eval(code);
			if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
			if (evaled == "Promise { <pending> }") return;
			var intervalId = setInterval(() => {
				message.channel.send((evaled.substr(0, 1990)), { code: 'js' });
				evaled = evaled.slice(1990);
				if (evaled.length == 0) clearInterval(intervalId);
			}, 4000);
		} catch (err) {
			message.channel.send(`\`ERROR\` \`\`\`js\n${err}\n\`\`\``);
		};

	},
};
