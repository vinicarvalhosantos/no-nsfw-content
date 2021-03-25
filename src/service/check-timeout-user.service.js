const utils = require('../utils/index');


module.exports = (client) => {
    client.on('message', async message => {
        if (utils.checkIfMemberHasRole(message.member, ['In Timeout'])) {
            message.delete();
        }
    });
}