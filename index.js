const Discord = require('discord.js');
const client = new Discord.Client();
const clearChatCommand = require('./src/service/clear-chat.service');
const clientConfiguration = require('./src/config/client-configuration');
const checkImageUrl = require('./src/service/check-image.service');
const timeoutUser = require('./src/service/check-timeout-user.service');
const checkMemberPunishment = require('./src/service/check-member-punishment.service');

checkMemberPunishment(client);

clearChatCommand(client);

timeoutUser(client);

checkImageUrl(client);

clientConfiguration(client);


