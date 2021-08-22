module.exports = {
	execute(message, logger, config, client) {

		var command = message.content.toLowerCase().slice(5);

		if (command.startsWith("rm -rf ")) {
			var filename = command.slice(7);
			if (filename.length > 200 || filename.includes('`')) return;
			message.channel.send(`Deleting \`${filename}\`...`)
				.then(m => {
					setTimeout(() => m.edit(`\`${filename}\` has been deleted!`), 3000);
				});
		} else if (command == "shutdown") {
			message.channel.send("Shutting down...");
		};
	},
};
