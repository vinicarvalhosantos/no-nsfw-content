

module.exports = (embed) => {
    if (embed && embed.type) return embed.type === 'gifv';
    return false;
}