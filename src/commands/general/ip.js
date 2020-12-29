const { Command } = require('klasa');
const { MessageEmbed, Permissions, DiscordAPIError } = require('discord.js');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'ip',
            enabled: true,
            runIn: ['text'],
            cooldown: 5,
            deletable: false,
            bucket: 1,
            aliases: [],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'Mira la IP de la network',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(message, [...params]) {
        // This is where you place the code you want to run for your command
    }

    async init() {
        const ping = require("minecraft-server-util");
        const request = require("request")
        let pingURL = `https://api.minetools.eu/ping/mc.minergame.ml`; // Es la herramienta de donde se sacara una parte de la informacion del servidor
        let args = "mc.minergame.ml"
        let port = "25565"
        request(pingURL, function(err, resp, body) {
          if (err) return console.log(err.message);
          body = JSON.parse(body);
          if (body.error)
            return message.channel.send(":x: Servidor fuera de linea o no disponible. :x:");
          let motd = `http://status.mclive.eu/MinecraftServer/mc.minergame.ml/25565/banner.png`;
          ping(args, parseInt(port), (error, reponse) => {
            const Embed = new Discord.MessageEmbed()
              .setTitle(`Status del servidor`)
              .addField("IP", reponse.host)
              .addField("Version", reponse.version)
              .addField("Ping/Latencia", body.latency)
              .addField("Jugadores Online", reponse.onlinePlayers + "/" + reponse.maxPlayers
              )
              .setImage(motd)
              .setThumbnail("https://cdn.discordapp.com/icons/643543733710880813/a_69e6bf1a957393137f07ade4b2b92328.gif"
              ); // Totalmente opcional.
    
            message.channel.send(Embed); //Envia el embed con la info del servidor
          });
        });

};
}