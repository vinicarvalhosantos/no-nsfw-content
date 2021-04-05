const Discord = require('discord.js');
const checkImageContent = require('../http-service/check-image.http-service');
const textMessage = require('../text/index');
/*const TIMEOUT_ROLES = ['Helper', 'Moderator', 'Administrator'];
const KICK_ROLES = ['Moderator', 'Administrator'];
const BAN_ROLES = ['Administrator']*/


/**
 * This method is responsable to make some prepares and send the image url to check.
 * Method Steps:
 *  - Delete the original message;
 *  - Reply the message owner that we analysing the image sent
 *  - Send url to the API to check image content
 *  - Check if API return error
 *    - If not: Send the embed message
 *    - If returns error: Delete the reply message
 * 
 * @param {Discord.Message} message The discord message object
 * @param {String} image The image url
 */
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

/**
 * This method is responsable to check if an image was sended
 * Method Steps:
 *  - Try to extract an image url by message attachments
 *  - Check if it was extracted, send the url to prepare
 * 
 * @param {Discord.Message} message Discord message object
 */
const checkSendedImage = async (message) => {
    const image = await message.attachments.size > 0 ? message.attachments.array()[0].proxyURL : null;
    if (image) {
        prepareImageContentToCheck(message, image);
    }
}

/**
 * This method is responsable to send final embed message
 * Method Steps:
 *  - Delete the reply message
 *  - Check if the image sent is a nsfw content
 *  - If it is:
 *    - Create a embed message with color and the image sent
 *    - Send this embed message to the chat
 *  - If it's not:
 *    - Create a embed message with color, the message that the image sent is a nsfw content, add fields with action that is possible to happen(Timeout, kick and ban)
 *    - Send this embed message to the chat
 *    - React to this message with number of actions
 * 
 * @param {String} urlImage Image url
 * @param {Discord.Message} message Discord message object
 * @param {Discord.Message} messageWaiting Discord message object
 * @param {Boolean} isNsfw If the image is a nsfw content
 */
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

/**
 * This method is responsable to check if a url is an image or not
 * 
 * @param {String} urlImage Image url
 * @returns {Boolean} Returns true if its an image and false if its not
 * 
 */
const urlIsJpgPngOrGif = (urlImage) => {
    const urlSplitted = urlImage.split('/');
    const imageName = urlSplitted[urlSplitted.length - 1];
    const imageNameSplitted = imageName.split('.');
    const imageExtension = imageNameSplitted[imageNameSplitted.length - 1];
    if (imageExtension === 'png' || imageExtension === 'jpeg' || imageExtension === 'jpg' || imageExtension === 'gif') {
        return true
    }
    return false;
}

/**
 * This method is responsable to check if a string is a url
 * 
 * @param {String} message String sent by user 
 * @returns {Boolean} Returns true if it is a url and false if its not
 */
const haveUrl = (message) => {
    const pattern = new RegExp('([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?');
    return pattern.test(message);
}

/**
 * This method is responsable to check if it is a gif
 * 
 * @param {Discord.Embed} embed String sent by user 
 * @returns {Boolean} Returns true if it is a gif and false if its not
 */
const isGif = (embed) => {
    if (embed && embed.type) return embed.type === 'gifv';
    return false;
}

module.exports = { prepareImageContentToCheck, checkSendedImage, urlIsJpgPngOrGif, haveUrl, isGif }