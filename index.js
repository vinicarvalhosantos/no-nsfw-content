const Discord = require('discord.js');
const client = new Discord.Client();
const clearChatCommand = require('./src/service/clear-chat.service');
const clientConfiguration = require('./src/config/client-configuration');
const checkImageUrl = require('./src/service/check-image.service');

clearChatCommand(client);

checkImageUrl(client);

clientConfiguration(client);


