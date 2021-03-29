const utils = require('../utils/index');
const TIMEOUTROLES = ['In Timeout']


module.exports = (client) => {
    client.on('message', async message => {
        if (utils.checkIfMemberHasRole(message.member, TIMEOUTROLES)) {
            message.delete();
        }
    });

    client.on('voiceStateUpdate', async (oldMember, newMember) => {
        const member = newMember.guild.members.cache.find(member => member.id === newMember.id);
        if (utils.checkIfMemberHasRole(member, TIMEOUTROLES)) {
            newMember.member.voice.kick();
        }
    })
}