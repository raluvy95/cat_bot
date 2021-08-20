module.exports = {
	execute(logger, config, client) {

		let statusNumber = 0;
		setInterval(() => {
			if (statusNumber == config.statuses.length - 1) {
				statusNumber = 0;
			} else {
				statusNumber = statusNumber + 1;
			};
			let status = config.statuses[statusNumber];

			status = status.replace("{guildCount}", client.guilds.cache.size);
			status = status.replace("{cmdPrefix}", config.cmdPrefix);

			let statusType;
			switch (status.charAt(0)) {
				case 'W':
					statusType = "WATCHING";
					break;
				case 'P':
					statusType = "PLAYING";
					break;
				case 'L':
					statusType = "LISTENING";
					break;
				default:
					logger.warn("One or more of the statuses did not start with a W/P/L so will not be used.");
					return;
			};
			client.user.setActivity(status.slice(1), { type: statusType });
		}, config.statusCycleTimeInSeconds * 1000);

	},
};
