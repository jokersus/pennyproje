const { getMessage, getAllIDs, remove } = require('./databaseHandler.js');
const moment = require('moment');

module.exports = async message => {
	if (!message.guild) {
		return;
	} else {
		if (message.member.lastMessage) {
			if ((Date.now() - message.member.lastMessage.createdTimestamp) > 300000) {
				const query = await remove(message.author.id, message.client.database);
				if (query.stmt.changes) {
					return message.channel.send(`${message.author.toString()} removed your AFK message.`);
				}
			}
		}
		message.mentions.members
			.tap(member => {
				getMessage(message.author.id, message.client.database)
					.then(entry => {
						if (entry) {
							if (message.author.id === member.id) {
								return;
							} else {
								message.channel.send(`${member.user.tag} is AFK: ${entry.message}\n-- ${moment(entry.datetime_text).fromNow()}`);
							}
						}
					});
			});
	}
};
