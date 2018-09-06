const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const { Util } = require('discord.js');
const fs = require("fs");
const queue = new Map();
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
var rcoins = require("./playerequipment/coins.json");
var coins = require("./coins.json");
var xp = require("./xp.json");
var purple = botconfig.purple;
var cooldown = new Set();
var cdseconds = 5;
const chratis_cooldown_time = 5;


fs.readdir("./commands/", (err, files) =>  {

  if(err) console.log(err);

  var jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.lenght <= 0){
    console.log("Couldn't find commands.")
    return;
  }

  jsfile.forEach((f, i) =>{
    var props = require(`./commands/${f}`);
    console.log(`${f} loaded!`)
    bot.commands.set(props.help.name, props);
  });
});

//bot.on("guildMemberAdd", async member => {
  //console.log(`${member.id} joined the server.`);

  //var welcomechannel = member.guild.channels.find(`name`, "smalltalk");
  //welcomechannel.send(`LOOK OUT! ${member} has joined the fam! Make sure to read the #rules and make an #introduction so we can give you roles for gender, location and/or nationality.`);
//});

//bot.on("guildMemberRemove", async member => {

  //console.log(`${member.id} left the server.`);

  //var welcomechannel = member.guild.channels.find(`name`, "smalltalk");
  //welcomechannel.send(`BEGONE THOT!`);
//});
//${member} has left the server!

bot.on("roleUpdate", async (oldRole, newRole)=> {

  var logchannel = newRole.guild.channels.find(`name`, "log");
  logchannel.send(`The role ${oldRole.name} has been changed to ${newRole}`);


});

bot.on("roleDevare", async role => {
  var logchannel = message.guild.channels.find(`name`, "smalltalk");
  logchannel.send(`The role ${role.name} has been devared.`);
});


bot.on("channelCreate", async channel => {

  console.log(`${channel.name} has been created.`);

  var sChannel = channel.guild.channels.find(`name`, "smalltalk");
  sChannel.send(`${channel} has been created`);

});

bot.on("channelDevare", async channel => {

  console.log(`${channel.name} has been devared.`);

  var sChannel = channel.guild.channels.find(`name`, "smalltalk");
  sChannel.send(`${channel.name} has been devared`);
});




//bot.on('ready', () => {
    //bot.user.setStatus('available')
    //bot.user.setPresence({
        //game: {
            //name: 'Vloom Streaming',
            //type: "STREAMING",
            //url: "https://www.twitch.tv/vloomed"
        //}
    //});
//});
bot.on("ready", () => {
  console.log(`Penny has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
  bot.user.setActivity(`with ${bot.users.size} users on INTSL`);
});


bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  var prefix = botconfig.prefix;
  if(!message.content.startsWith(prefix)) return;
  if(cooldown.has(message.author.id)){
    message.devare();
    var cdembed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor(botconfig.red)
    .addField("❌Error", "You need to wait 5 secs between commands.");
    return message.channel.send(cdembed).then(message => {message.devare(3000)});1
  }
  if(!message.member.hasPermission("ADMINISTRATOR")){
    cooldown.add(message.author.id);
  }
  var messageArray = message.content.split(" ");
  var cmd = messageArray[0];
  var args = messageArray.slice(1);

  if(!rcoins[message.author.id]) coins[message.author.id] = {
    coins: 0
  };

  var chancenum = Math.floor(Math.random()* 15);
  var onnum = Math.floor(Math.random() * 15);
  if(chancenum === onnum){
    var rcoinamount = chancenum + 1;
    rcoins[message.author.id] = {
      rcoins: rcoins[message.author.id].coins + rcoinamount
    };
    var rcoinsembed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor(botconfig.purple)
    .addField("💰", `${rcoinamount} pennies added!`);
    message.channel.send(rcoinsembed).then(message => message.devare(5000));
    console.log(`${rcoinamount} pennies added to ${message.author.username}`);

    fs.writeFile("./playerequipment/coins.json", JSON.stringify(coins), (err) => {
      if (err) console.log(err)
    });

  }

  var commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  setTimeout(() => {
    cooldown.devare(message.author.id);
}, chratis_cooldown_time * 1000);

});



    if(!coins[message.author.id]){
      coins[message.author.id] = {
        coins: 0
      };
    }

    var coinAmt = Math.floor(Math.random() * 15) + 1;
    var baseAmt = Math.floor(Math.random() * 15) + 1;
    console.log(`${coinAmt} ; ${baseAmt}`);

    if(coinAmt === baseAmt){
      coins[message.author.id] = {
        coins: coins[message.author.id].coins + coinAmt
      };
    fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
      if (err) console.log(err)
    });
    var coinEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor("#0000FF")
    .addField("<:Pennies_HEADS:470660608736624640>", `${coinAmt} coins added!`);

    //message.channel.send(coinEmbed).then(message => {message.devare(5000)});
    }


    var xpAdd = Math.floor(Math.random() * 7) + 8;
  console.log(xpAdd);

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }

  var curxp = xp[message.author.id].xp;
  var curlvl = xp[message.author.id].level;
  var nxtLvl = xp[message.author.id].level * 800;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    var lvlup = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setTitle("Level Up!")
    .setColor(purple)
    .addField("New Level", curlvl + 1);


    //message.channel.send(lvlup).then(message => {message.devare(5000)});
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });


    var prefix = prefixes[message.guild.id].prefixes;
    var messageArray = message.content.split(" ");
    var cmd = messageArray[0];
    var args = messageArray.slice(1);

    var commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);


});

bot.login(botconfig.token);
