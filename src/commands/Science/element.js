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
                // Discord.js v13 won't longer support
                // other typings than String in name and value so I used .toString() || 'none'
                { name: "Appearance", value: element.appearance?.toString() || 'none' },
                { name: "Atomic Mass", value: element.atomic_mass?.toString() || 'none' },
                { name: "Boiling Point", value: (element.boil?.toString() || 'none')+"°k" },
                { name: "Category", value: element.category?.toString() || 'none' },
                { name: "Colour", value: element.color?.toString() || 'none' },
                { name: "Density", value: density?.toString() || 'none' },
                { name: "Discoverer", value: element.discovered_by?.toString() || 'none' },
                { name: "Melting point", value: (element.melt?.toString() || 'none') +"°k" },
                { name: "Molar Heat", value: (element.molar_heat?.toString() || 'none')+" mol*K" },
                { name: "Namer", value: element.named_by?.toString() || 'none' },
                { name: "Number", value: element.number?.toString() || 'none' },
                { name: "Period", value: element.period?.toString() || 'none' },
                { name: "Phase", value: element.phase?.toString() || 'none' },
                { name: "Source", value: element.source?.toString() || 'none' },
                { name: "Summary", value: element.summary?.toString() || 'none' },
                { name: "Symbol", value: element.symbol?.toString() || 'none' },
                { name: "X Position", value: element.xpos?.toString() || 'none' },
                { name: "Y Position", value: element.ypos?.toString() || 'none' },
                { name: "Shells", value: element.shells.join(", ") },
                { name: "Electron Configuration", value: element.electron_configuration?.toString() || 'none' },
                { name: "Electron Configuration Semantic", value: element.electron_configuration_semantic?.toString() || 'none' },
                { name: "Electron Affinity", value: element.electron_affinity?.toString() || 'none' },
                { name: "Electronegativity Pauling", value: element.electronegativity_pauling?.toString() || 'none' },
                { name: "Ionization Energies", value: element.ionization_energies.join(", ") },
            )
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL());

            message.channel.send({embeds: [embed]});

	},
};