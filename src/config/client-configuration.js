require('dotenv').config();
const TOKEN = process.env.TOKEN;

function clientConfiguration(client) {

    client.login(TOKEN);

    client.on('ready', () => {
        console.info(`Logged in as ${client.user.tag}!`);
    });


}

module.exports = exports = clientConfiguration;