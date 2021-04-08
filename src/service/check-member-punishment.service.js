const Discord = require('discord.js');
const textMessage = require('../text/index');
const utils = require('../utils/index');
const guildsInvites = new Map();

module.exports = (client) => {

    client.on('inviteCreate', async invite => { guildsInvites.get, set(invite.guild.id, await invite.guild.fetchInvites()) });

    client.on('ready', () => {
        client.guilds.cache.forEach(guild => {
            guild.fetchInvites()
                .then(invites => guildsInvites.set(guild.id, invites))
                .catch(error => console.error(error));
        });
    });

    client.on('guildMemberAdd', async member => {
        const defaultChannel = utils.getDefaultChannel(member.guild);
        const cachedInvites = guildsInvites.get(member.guild.id);
        const newInvites = await member.guild.fetchInvites();
        guildsInvites.set(member.guild.id, newInvites);
        const usedInvite = newInvites.find(invite => cachedInvites.get(invite.code).uses < invite.uses);
        const embed = await new Discord.MessageEmbed()
            .setAuthor(client.user.tag, client.user.avatarURL())
            .setColor('#7a1b0c')
            .setTitle(`Member with bad historical has joined!`)
            .setDescription(`A member with a bad history has joined the server. See some informations about this member`)
            .addFields(
                { name: `Member name`, value: `${member.user.tag}`, inline: true },
                { name: `Inviter member`, value: `${usedInvite.inviter.tag}`, inline: true },
                { name: `Member punishments count`, value: `200`, inline: true },
                { name: `Member complete historical`, value: `encurtador.com.br/pORT3`, inline: true })
            .setTimestamp();
        defaultChannel.send(embed);
    });
}