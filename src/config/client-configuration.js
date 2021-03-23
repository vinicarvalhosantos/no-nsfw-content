require('dotenv').config();
const TOKEN = process.env.TOKEN;

module.exports = (client) => {
    client.login(TOKEN);

    client.on('ready', () => {
        console.info(`Logged in as ${client.user.tag}!`);
    });
}