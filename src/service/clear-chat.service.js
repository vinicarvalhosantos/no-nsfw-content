require('dotenv').config();
const ENVIRONMENT = process.env.ENVIRONMENT;

module.exports = (client) => {
    if (ENVIRONMENT !== 'PROD') {
        client.on('message', async message => {
            if (message.content.startsWith('!clear')) {
                message.channel.messages.fetch({ limit: 100 }).then(messages => message.channel.bulkDelete(messages, true));
            }
        });
    }
}