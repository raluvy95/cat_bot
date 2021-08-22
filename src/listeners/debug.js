module.exports = {
	name: 'debug',
	execute(logger, config, client, debug) {

		if (!config.dJsDebug.enabled) return;
		if (config.dJsDebug.hideHeartbeats && debug.includes("Heartbeat")) return;

		logger.debug(debug, 0);

	},
};
