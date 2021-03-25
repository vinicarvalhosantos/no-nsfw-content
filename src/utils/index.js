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
 * @param {Array} role A list with with roles to check if member has it.
 * @returns {Boolean} Returns true if member has the role passed by function and false if not.
 * @example
 *     checkIfMemberHasRole(member, ['Moderator']); 
 */
const checkIfMemberHasRole = (member, role) => {
    if (member.roles.cache.some(myRole => role.includes(myRole.name))) return true;
    return false;
}


module.exports = { getHighestValue, checkIfMemberHasRole }