const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const { Util } = require('discord.js');
const fs = require("fs");
const { GOOGLE_API_KEY, PREFIX } = require('./config.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(GOOGLE_API_KEY);
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

bot.on('warn', console.warn);

bot.on('error', console.error);

bot.on('ready', () => console.log('Yo this ready!'));

bot.on('disconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));

bot.on('reconnecting', () => console.log('I am reconnecting now!'));

bot.on('message', async message => { // eslint-disable-line
	if (message.author.bot) return undefined;
	if (!message.content.startsWith(PREFIX)) return undefined;

	const args = message.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(message.guild.id);

	var command = message.content.toLowerCase().split(' ')[0];
	command = command.slice(PREFIX.length)

	if (command === 'play') {
		const voiceChannel = message.member.voiceChannel;
		if (!voiceChannel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
		const permissions = voiceChannel.permissionsFor(bot.user);
		if (!permissions.has('CONNECT')) {
			return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
		}
		if (!permissions.has('SPEAK')) {
			return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return message.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					var index = 0;
					message.channel.send(`
__**Song selection:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Please provide a value to select one of the search results ranging from 1-10.
					`);
					// eslint-disable-next-line max-depth
					try {
						var Rresponse = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return message.channel.send('No or invalid value entered, cancelling video selection.');
					}
					const videoIndex = parseInt(Rresponse.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return message.channel.send('🆘 I could not obtain any search results.');
				}
			}
			return handleVideo(video, message, voiceChannel);
		}
	} else if (command === 'skip') {
		if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
		if (!serverQueue) return message.channel.send('There is nothing playing that I could skip for you.');
		serverQueue.connection.dispatcher.end('Skip command has been used!');
		return undefined;
	} else if (command === 'stop') {
		if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
		if (!serverQueue) return message.channel.send('There is nothing playing that I could stop for you.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop command has been used!');
		return undefined;
	} else if (command === 'volume') {
		if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
		if (!serverQueue) return message.channel.send('There is nothing playing.');
		if (!args[1]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return message.channel.send(`I set the volume to: **${args[1]}**`);
	} else if (command === 'np') {
		if (!serverQueue) return message.channel.send('There is nothing playing.');
		return message.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
	} else if (command === 'queue') {
		if (!serverQueue) return message.channel.send('There is nothing playing.');
		return message.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Now playing:** ${serverQueue.songs[0].title}
		`);
	} else if (command === 'pause') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return message.channel.send('⏸ Paused the music for you!');
		}
		return message.channel.send('There is nothing playing.');
	} else if (command === 'resume') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send('▶ Resumed the music for you!');
		}
		return message.channel.send('There is nothing playing.');
	}

	return undefined;
});

async function handleVideo(video, message, voiceChannel, playlist = false) {
	const serverQueue = queue.get(message.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(message.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(message.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.devare(message.guild.id);
			return message.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return message.channel.send(`✅ **${song.title}** has been added to the queue!`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.devare(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
}

bot.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    var prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if(!prefixes[message.guild.id]){
      prefixes[message.guild.id] = {
        prefixes: botconfig.prefix
      };
    }

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
