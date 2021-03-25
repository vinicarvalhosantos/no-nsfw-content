const getHighestValue = (firstValue, secondValue) => {
    return firstValue > secondValue ? firstValue : secondValue;
}

const checkIfMemberHasRole = (member, role) => {
    if (member.roles.cache.some(myRole => role.includes(myRole.name))) return true;
    return false;
}


module.exports = { getHighestValue, checkIfMemberHasRole }