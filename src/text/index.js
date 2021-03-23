const ANALYSING_MESSAGE = `Hi there! we are analysing the image that you sent. Don't worry, if it are not a nsfw content I will send it again. :smile:`;
const EMBED_NSFW_MESSAGE_TITLE = `NSFW Content Detected!`;
const EMBED_NSFW_MESSAGE = `A nsfw content image was detect on {user} message!\nShould I:`;
const EMBED_NSFW_MESSAGE_ACTION_TIMEOUT_TITLE = `:one: Timeout`;
const EMBED_NSFW_MESSAGE_ACTION_TIMEOUT = `Timeout of {timeout_time}.`;
const EMBED_NSFW_MESSAGE_ACTION_KICK_TITLE = `:two: Kick`;
const EMBED_NSFW_MESSAGE_ACTION_KICK = `Kick from this server.`;
const EMBED_NSFW_MESSAGE_ACTION_BAN_TITLE = `:three: Ban`;
const EMBED_NSFW_MESSAGE_ACTION_BAN = `Ban from this server.`;

const getAnalysingMessage = () => { return ANALYSING_MESSAGE; }

const getEmbedNsfwMessageTitle = () => { return EMBED_NSFW_MESSAGE_TITLE; }

const getEmbedNsfwMessage = (author) => {
    const user = `${author.username.endsWith('s') ? author.username : `${author.username}'s`}`
    return EMBED_NSFW_MESSAGE.replace('{user}', user);
}

const getEmbedNsfwMessageActionTimeoutTitle = () => { return EMBED_NSFW_MESSAGE_ACTION_TIMEOUT_TITLE; }

const getEmbedNsfwMessageActionTimeout = (timeoutTime) => {
    const formattedTimeoutTime = timeoutTime === 1 ? `${timeoutTime} minute` : `${timeoutTime} minutes`;
    return EMBED_NSFW_MESSAGE_ACTION_TIMEOUT.replace('{timeout_time}', formattedTimeoutTime);
}

const getEmbedNsfwMessageActionKickTitle = () => { return EMBED_NSFW_MESSAGE_ACTION_KICK_TITLE; }

const getEmbedNsfwMessageActionKick = () => { return EMBED_NSFW_MESSAGE_ACTION_KICK; }

const getEmbedNsfwMessageActionBanTitle = () => { return EMBED_NSFW_MESSAGE_ACTION_BAN_TITLE; }

const getEmbedNsfwMessageActionBan = () => { return EMBED_NSFW_MESSAGE_ACTION_BAN; }

module.exports = {
    getAnalysingMessage, getEmbedNsfwMessageTitle, getEmbedNsfwMessage, getEmbedNsfwMessageActionTimeoutTitle, getEmbedNsfwMessageActionTimeout,
    getEmbedNsfwMessageActionKickTitle, getEmbedNsfwMessageActionKick, getEmbedNsfwMessageActionBanTitle, getEmbedNsfwMessageActionBan
}