module.exports = {
	name: 'element',
	minArgs: 1,
	botOwnerOnly: false,
	requiredUserPerms: [],
	cooldown: 4,
	description: "See info about an element",
	usage: '<element name>',
	execute(message, args, logger, config, client) {

        const ptable = require('../../../data/static/periodic-table-lookup.json');

        if (!ptable.order.includes(args[0].toLowerCase())) return message.reply("That element doesn't exist.");

        const element = ptable[args[0].toLowerCase()];

        var density;
        if (element.phase == "Gas") { density = element.density+"g/l" } else { density = element.density+"g/cm³"};

        let embed = new client.Embed()
            .setTitle(element.name + " element")
            .setDescription("Source: [Periodic-Table-JSON](https://github.com/Bowserinator/Periodic-Table-JSON)")
            .addFields(
                { name: "Appearance", value: element.appearance },
                { name: "Atomic Mass", value: element.atomic_mass },
                { name: "Boiling Point", value: element.boil+"°k" },
                { name: "Category", value: element.category },
                { name: "Colour", value: element.color },
                { name: "Density", value: density },
                { name: "Discoverer", value: element.discovered_by },
                { name: "Melting point", value: element.melt+"°k" },
                { name: "Molar Heat", value: element.molar_heat+" mol*K" },
                { name: "Namer", value: element.named_by },
                { name: "Number", value: element.number },
                { name: "Period", value: element.period },
                { name: "Phase", value: element.phase },
                { name: "Source", value: element.source },
                { name: "Summary", value: element.summary },
                { name: "Symbol", value: element.symbol },
                { name: "X Position", value: element.xpos },
                { name: "Y Position", value: element.ypos },
                { name: "Shells", value: element.shells.join(", ") },
                { name: "Electron Configuration", value: element.electron_configuration },
                { name: "Electron Configuration Semantic", value: element.electron_configuration_semantic },
                { name: "Electron Affinity", value: element.electron_affinity },
                { name: "Electronegativity Pauling", value: element.electronegativity_pauling },
                { name: "Ionization Energies", value: element.ionization_energies.join(", ") },
            )
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL());

            message.channel.send(embed);

	},
};