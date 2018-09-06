const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kUser) message.channel.send("Can't find user!");
  let kReason = args.slice(1).join(" ") || "None"
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Aww sorry but you are not cool enough to do this");
  if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked bro!")

  let kickEmbed = new Discord.RichEmbed()
  .setDescription("~Kick~")
  .setColor("#e56b00")
  .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
  .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("Kicked In", message.channel)
  .addField("Reason", kReason);

  message.guild.member(kUser).kick(kReason);

  message.channel.send(kickEmbed);


}

  module.exports.help = {
    name: "kick"
  }
