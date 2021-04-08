require('dotenv').config();
const Discord = require('discord.js');
const textMessage = require('../text/index');
const utils = require('../utils/index');
const TOKEN = process.env.TOKEN;

module.exports = (client) => {
    client.login(TOKEN);

    client.on('ready', () => {
        console.info(`Logged in as ${client.user.tag}!`);
    });

    client.on('guildCreate', async guild => {
        const defaultChannel = utils.getDefaultChannel(guild);
        const embed = await new Discord.MessageEmbed()
            .setAuthor(client.user.tag, client.user.avatarURL())
            .setColor('#800080')
            .setTitle(textMessage.getWelcomeMessageTitle(guild.name))
            .setDescription(textMessage.getWelcomeMessage())
            .addFields(
                { name: textMessage.getWelcomeMessageWebsiteTitle(), value: textMessage.getWelcomeMessageWebsite(), inline: true },
                { name: textMessage.getWelcomeMessageDiscordTitle(), value: textMessage.getWelcomeMessageDiscord(), inline: true })
            .setFooter(textMessage.getBotDevelopedMessage())
            .setTimestamp();

        defaultChannel.send(embed);

    })
}