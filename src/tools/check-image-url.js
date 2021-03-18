const haveUrl = require('./url-check');
const Discord = require('discord.js');
const checkImageContent = require('../http-service/check-image.http-service');


function checkImageUrl(client) {
    client.on('message', async message => {
        if (message.author.tag != client.user.tag) {
            if (haveUrl(message)) {
                const image = message;
                prepareImageContentToCheck(message, image);
            } else {
                checkSendedImage(message);
            }
        }
    });
}

const prepareImageContentToCheck = async (message, image) => {
    await message.delete();
    const messageWaiting = await message.reply(`Hi there! we are analysing the image that you sent. Don't worry, if it are not a nsfw content I will send it again. :smile:`);
    const result = await checkImageContent(image);
    sendEmbedMessage(result.urlImage, message, messageWaiting, result.isNsfwContent);
}

const checkSendedImage = async (message) => {
    const image = message.attachments.size > 0 ? message.attachments.array()[0].proxyURL : null;
    if (image) {
        prepareImageContentToCheck(message, image);
    }
}

const sendEmbedMessage = async (urlImage, message, messageWaiting, isNsfw = false) => {
    if (!isNsfw) {
        const embed = await new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setImage(`${urlImage}`)
            .setColor('#0099FF');
        await message.channel.send(embed);
    } else {
        const embed = await new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setColor('#C70039')
            .setTitle('NSFW Content Detected!')
            .setDescription(`A nsfw content image was detect on ${message.author.username.endsWith('s') ? message.author.username : 's'} message!\nShould I:`)
            .addFields(
                { name: ':one: Timeout', value: 'Timeout of 10 minutes.', inline: true },
                { name: ':two: Kick', value: 'Kick from this server.', inline: true },
                { name: ':three: Ban', value: 'Ban from this server.', inline: true })
            .setTimestamp();
        const messageToReact = await message.channel.send(embed);
        messageToReact.react('1️⃣');
        messageToReact.react('2️⃣');
        messageToReact.react('3️⃣');
    }
    messageWaiting.delete();
}

module.exports = exports = checkImageUrl;