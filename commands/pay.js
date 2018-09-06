const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
  

  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
    return message.reply(`Sorry, you have ${coins[message.author.id].coins} pennies.`);
  }
  //let cointoadd = parseINT(args[1]);
  if(isNaN(args[1])) return message.reply("Ugh... What? ")

  if(coins[message.author.id].coins < args [2]) return message.reply(`Sorry, you have ${coins[message.author.id].coins} pennies.`);



  let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!pUser) return message.reply("Usage: >pay [@user] [amount]");
  if(message.author.id === pUser.id) return message.reply("Can't pay yourself");
  if(!coins[pUser.id]){
    coins[pUser.id] = {
      coins: 0
    }
  }
  let sCoins = coins[message.author.id].coins;
  let pCoins = coins[pUser.id].coins;
  if(sCoins < args[1]) return message.reply("You don't have enough pennies for that.");
  if(args[1] < 1) return message.reply("whoops");
  if(!args[1]) return message.reply("Usage: >pay [@user] [amount]");

  coins[message.author.id] = {
    coins: sCoins - parseInt(args[1])
  };

  coins[pUser.id] = {
    coins: pCoins + parseInt(args[1])
  };

  message.channel.send(`${message.author} has given ${pUser} ${args[1]} pennies.`);

  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if(err) cosole.log(err)
  });


}

module.exports.help = {
  name: "pay"
}
