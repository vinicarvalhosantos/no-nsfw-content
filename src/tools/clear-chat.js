function clearChat(client) {
  client.on('message', async message => {
    if (message.content.startsWith('!clear')) {
      message.channel.messages.fetch({ limit: 100 }).then(messages => message.channel.bulkDelete(messages, true));
    }
  });
}

module.exports = exports = clearChat;