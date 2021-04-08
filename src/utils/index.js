/**
 * This method is responsable to return wich of params is higher.
 * 
 * @param {Number} firstValue First number to compare.
 * @param {Number} secondValue Second number to compare.
 * @returns {Number} Returns the highest number between params.
 * @example
 *      getHighestValue(10, 20);
 */

const getHighestValue = (firstValue, secondValue) => {
    return firstValue > secondValue ? firstValue : secondValue;
}

/**
 * This method is responsable to check if a discord member has a role.
 * 
 * @param {Discord.Member} member A discord member object wich contains the role name and id and some other things not important to this function.
 * @param {Array} roles A list with with roles to check if member has it.
 * @returns {Boolean} Returns true if member has the role passed by function and false if not.
 * @example
 *     checkIfMemberHasRole(member, ['Moderator']); 
 */
const checkIfMemberHasRole = (member, roles) => {
    if (member.roles.cache.some(myRole => roles.includes(myRole.name))) return true;
    return false;
}

/**
 * This method is responsable to get the guild's default text channel.
 * 
 * @param {Discord.Guild} guild Guild to get the default text channel.
 * @returns {Discord.Channel} returns a channel.
 */
const getDefaultChannel = (guild) => {
    let defaultChannel = '';
    guild.channels.cache.forEach((channel) => {
        if (channel.type === 'text' && defaultChannel === '') {
            if (channel.permissionsFor(guild.me).has('SEND_MESSAGES')) {
                defaultChannel = channel;
            }
        }
    });
    return defaultChannel;
}


module.exports = { getHighestValue, checkIfMemberHasRole, getDefaultChannel }