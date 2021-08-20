module.exports = {
    execute(member, logger, config, client) {

        if (member.guild.id != config.joinMsg.guildId) return;
        var msg = config.joinMsg.message.replace("{user}", "<@!" + member.id + '>');
        client.channels.cache.get(config.joinMsg.channelId).send(msg);

    },
};