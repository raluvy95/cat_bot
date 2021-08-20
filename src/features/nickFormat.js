module.exports = {
	execute(member, logger, config, client) {

		if (!config.nickFormat.guilds.includes(member.guild.id)) return;
		var nickname = config.nickFormat.format.replace("{user}", member.user.username);

		if (nickname.length > 32 && !config.nickFormat.trim) return logger.debug(`nickFormat not changing nickname for user ${member.user.username} as it was too long and trim is disabled`, 3);
		member.setNickname(nickname.substring(0, 32));
		logger.debug(`nickFormat set nickname of user ${member.user.id}`);

	},
};
