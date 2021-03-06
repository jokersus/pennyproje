const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

  if(args[0] == "help"){
    message.reply("Usage: p>ban <user> <reason>");
    return;
  }
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bUser) message.channel.send("Can't find user!");
  let bReason = args.slice(1).join(" ") || "None"
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Aww sorry but you are not cool enough to do this");
  if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be banned bro!");

  let banEmbed = new Discord.RichEmbed()
  .setDescription("~Ban~")
  .setColor("#bc0000")
  .addField("Banned User", `${bUser} with ID ${bUser.id}`)
  .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("Banned In", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", bReason);

  message.guild.member(bUser).ban(bReason);
  message.channel.send(banEmbed);
}

module.exports.help = {
  name:"ban"
}
