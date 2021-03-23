const checkImageUtils = require('../utils/check-image.utils');

module.exports = (client) => {
    client.on('message', async message => {
        if (message.author.tag != client.user.tag) {
            if (checkImageUtils.isGif(message.embeds[0])) {
                return;
            }
            if (checkImageUtils.haveUrl(message) && checkImageUtils.urlIsJpgPngOrGif(message.content)) {
                const image = message;
                checkImageUtils.prepareImageContentToCheck(message, image);
            } else {
                checkImageUtils.checkSendedImage(message);
            }
        }
    });
}