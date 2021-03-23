const Discord = require('discord.js');
const checkImageContent = require('../http-service/check-image.http-service');
const textMessage = require('../text/index');

const prepareImageContentToCheck = async (message, image) => {
    message.delete();
    const messageWaiting = await message.reply(textMessage.getAnalysingMessage());
    const result = await checkImageContent(image);
    if (result.error == null) {
        sendEmbedMessage(result.urlImage, message, messageWaiting, result.isNsfwContent);
    } else {
        messageWaiting.delete();
    }
}

const checkSendedImage = async (message) => {
    const image = await message.attachments.size > 0 ? message.attachments.array()[0].proxyURL : null;
    if (image) {
        prepareImageContentToCheck(message, image);
    }
}

const sendEmbedMessage = async (urlImage, message, messageWaiting, isNsfw = false) => {
    messageWaiting.delete();
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
            .setTitle(textMessage.getEmbedNsfwMessageTitle())
            .setDescription(textMessage.getEmbedNsfwMessage(message.author))
            .addFields(
                { name: textMessage.getEmbedNsfwMessageActionTimeoutTitle(), value: textMessage.getEmbedNsfwMessageActionTimeout(10), inline: true },
                { name: textMessage.getEmbedNsfwMessageActionKickTitle(), value: textMessage.getEmbedNsfwMessageActionKick(), inline: true },
                { name: textMessage.getEmbedNsfwMessageActionBanTitle(), value: textMessage.getEmbedNsfwMessageActionBan(), inline: true })
            .setTimestamp();
        const messageToReact = await message.channel.send(embed);
        messageToReact.react('1️⃣');
        messageToReact.react('2️⃣');
        messageToReact.react('3️⃣');
    }
}

const urlIsJpgOrPng = (urlImage) => {
    const urlSplitted = urlImage.split('/');
    const imageName = urlSplitted[urlSplitted.length - 1];
    const imageNameSplitted = imageName.split('.');
    const imageExtension = imageNameSplitted[imageNameSplitted.length - 1];
    if (imageExtension === 'png' || imageExtension === 'jpeg' || imageExtension === 'jpg') {
        return true
    }
    return false;
}

const haveUrl = (message) => {
    const pattern = new RegExp('([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?');
    return pattern.test(message);
}

const isGif = (embed) => {
    if (embed && embed.type) return embed.type === 'gifv';
    return false;
}

module.exports = { prepareImageContentToCheck, checkSendedImage, urlIsJpgOrPng, haveUrl, isGif }