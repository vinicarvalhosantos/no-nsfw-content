const Discord = require('discord.js');
const client = new Discord.Client();
const clearChatCommand = require('./src/tools/clear-chat');
const clientConfiguration = require('./src/config/client-configuration');
const checkImageUrl = require('./src/tools/check-image-url');

clearChatCommand(client);

checkImageUrl(client);

clientConfiguration(client);


