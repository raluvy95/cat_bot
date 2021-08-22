const statusCycler = require('../features/statusCycler.js');
const ytNotifs = require('../features/ytNotifs.js');

module.exports = {
	name: 'ready',
	once: true,
	execute(logger, config, client) {

		logger.info(`Logged in as ${client.user?.username}#${client.user?.discriminator}`);

		statusCycler.execute(logger, config, client);

		if (config.enabledFeatures.ytNotifs) ytNotifs.execute(logger, config, client);

	},
};
