const { Client } = require('klasa');
require('dotenv').config({ path: './src/.env' });

const token = process.env.TOKEN;


new Client({
    fetchAllMembers: false,
    prefix: ['m!'],
    commandEditing: true,
    typing: true,
    language: 'es-ES',
    owners: ['446717978189365269', //NoHacks
             '700520303624978514'
    ],
    readyMessage: (client) => `El bot ya fue iniciado, ¡Listo para ayudar a ${client.users.cache.size}!`
}).login(token).catch(console.error);