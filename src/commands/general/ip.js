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
      const ping = require('minecraft-server-util') // Instala el NPM antes
      const request = require("request");     // Instala el NPM Antes
       var port = args[1] 
      let ip = "mc.minergame.ml"
      if(!port) {
        port = `25565` 
      } // Si no ponen un puerto, el predeterminado será 25565
          let pingURL = `https://api.minetools.eu/ping/${ip}`
        request(pingURL, function(err, resp, body){
          if(err) return console.log(err.message);
          body = JSON.parse(body);
          if(body.error) return message.channel.send(":x: `Error | Servidor fuera de linea o no disponible.`") // Si la herramienta no encuentra nada sobre la ip
           let motd = `http://status.mclive.eu/MinecraftServer/${ip}/25565/banner.png` // Imagen del motd del servidor.
                  ping(ip, parseInt(port), (error, reponse) =>{ // Usando minecraft-server-until para sacar informacion mas especifica
                      if(error) return message.channel.send('No puedo encontrar ese servidor'); // Por si minetools lo reconoce pero la otra api no.
                      const Embed = new Discord.MessageEmbed()
                      .setTitle('Server Status')
                      .addField('Server IP', reponse.host) // ip del servidor
                      .addField('Server Version', reponse.version) // version del servidor
                      .addField('Latency', body.latency) // latencia del servidor con pingURL y request
                      .addField('Online Players', reponse.onlinePlayers + "/" + reponse.maxPlayers) // Jugadores online y limite de jugadores
                      .setImage(motd) // Motd antes definido
                      .setThumbnail('https://cdn.glitch.com/402b9099-0636-457a-8ffb-faf65c857490%2F1.png?v=1585792839856') // Totalmente opcional.
                      message.channel.send(Embed) //Envia el embed con la info del servidor
                      } )
        
                       
              })
};
}