const logger = require('./logger.js');
const fs = require('fs');
const yaml = require('js-yaml');
const config = yaml.load(fs.readFileSync('./config.yml', 'utf8'));
const Discord = require('discord.js');
const intents = new Discord.Intents()
const client = new Discord.Client({
    ws: {
        intents: intents.ALL
    }
});
const listenerFiles = fs.readdirSync('./src/listeners').filter(file => file.endsWith('.js'));
const commandDirs = fs.readdirSync('./src/commands');
const runAtStartup = require('./runAtStartup.js');

runAtStartup.execute(logger, config);

client.Embed = Discord.MessageEmbed;
client.commands = new Discord.Collection();
client.cmdCooldowns = new Discord.Collection();
client.cmdCooldown = Discord.Collection;

setTimeout(() => {

for (const dir of commandDirs) {
	const commandFiles = fs.readdirSync(`./src/commands/${dir}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${dir}/${file}`);
		client.commands.set(command.name, command);
	};
};

for (const file of listenerFiles) {
	const listener = require(`./listeners/${file}`);
	if (listener.once) {
		client.once(listener.name, (...args) => listener.execute(...args, logger, config, client));
	} else {
		client.on(listener.name, (...args) => listener.execute(...args, logger, config, client));
	};
};

client.login(config.tokens.bot);

}, 2000);
