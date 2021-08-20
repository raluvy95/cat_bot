module.exports = {
	name: 'debug',
	execute(debug, logger, config, client) {

		if (!config.dJsDebug.enabled) return;
		if (config.dJsDebug.hideHeartbeats && debug.includes("Heartbeat")) return;

		logger.debug(debug, 0);

	},
};
