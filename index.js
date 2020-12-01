// Usual bot variables
const Discord = require('discord.js');
const bot = new Discord.Client();
const token = require('./token.json');

// Words that aren't allowed on the server are made a top priority and will ping mods
const badlist = require('./bad.json'); 

// Words that might be part of hate speech
const hatelist = require('./hate.json'); 

// Words that might be mispelled bad words
const maybelist = require('./maybe.json'); 

// Words that are allowed pass the filter
const oklist = require('./ok.json'); 

// Unhelpful random sentences I use for debugging
const help = ["I live in constant pain.", "True black is the absence of light.", "Force equals mass times acceleration.", "I feel very small.", "It's five o'clock somewhere.", "Man...", "I don't sleep.", "I love my father.", "Chickens are flightless birds.", "A pork butt is actually a shoulder.", "We are constantly falling."];

// Sentences for summoning the monkeys in the time-out channel when someone gets muted
const summon = ["Come out and play!", "Fresh meat!", "Look! A new face to peel!"];

// READY FUNCTION

// When the bot first starts it sends a message to the console and then joins a voice channel to play an audio file on repeat. All of this code here is executed only once when the bot is activated!
bot.once('ready', () => {

	// Sends a message to the console letting me now the bot has started
	console.log("Otis is online!");

	// Makes the bot look like it's listening to something if you check it's profile
	bot.user.setActivity('Ilyx outro 24/7', { type: 'LISTENING' });

	// This is where the bot will join a designated voice channel to play a specified audio file 24/7 (or until it decides it wants to stop randomly)
	bot.channels.cache.get('772908857797115934').join().then(connection => {
		function play() {
			const dispatcher = connection.play('ilyxoutrofull.ogg', { bitrate: 48 });

			// Listener that checks if the audio is done playing so that it will play it agian
			dispatcher.on('finish', () => { 
				play();
			});
		}
		play();
	}).catch(console.error);
});

// MAIN FUNCTION

bot.on('message', (message) => {

	// Words of a message get split into "parts", putting each word into its own array index starting at 0
	const parts = message.content.split(' ');

	// Original main function this bot was made for
	parse6(parts, message);

	// Chat filter function
	filter(message);

	// Otis checks if it has been pinged and will respond with an emoji
	if(message.mentions.users.has('749657560142839899')) {
		const reactionEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'perhaps');
		message.react(reactionEmoji);
	}

	// Commands start here

	// Helpful debug command to make sure Otis is alive
	if (parts[0] === '^bark') {
		message.channel.send("mooo ");

	// Another debug command with fun random sentences
	} else if (parts[0] === '^help') {
		message.channel.send(help[Math.floor(Math.random() * 11)]);

	// Fun message that gets sent to the time-out channel that summons the monkeys with a random message
	} else if (parts[0] === '-mute') {
		const badboy = message.mentions.members.first();
		if(badboy != null) {
			bot.channels.cache.get('650381533873569793').send("<@&670922221786759168> " + summon[Math.floor(Math.random() * 2)]);
		}
	}
});

// This is the very first main function that Otis was made for! It was originally located in the bot.on function but was reloacated here along with other functions so that it is easier to manage
function parse6(parts, message) {

	// Checks if Mee6 or me is the message sender
	if (message.author == '159985870458322944' || message.author == '133441735438106624') {
		const member = message.mentions.members.first();

		// Each of these checks for a sentence that begins with Ilyx and ends with a level number
		if (parts[0] == 'Ilyx' && parts[7] == '100.') {

			// All roles are ID based so that if the server goes through a theme change, I do not have to manually change the names for every field
			member.roles.add('724326539784880138'); //100
			member.roles.remove('724326542586544209');

			// This levelup function creates a nice looking embed for the level up channel
			levelup(member, '724326539784880138', message);
			console.log(`role 100 granted to ${message.mentions.members.first().displayName}`);

		// The rest of these works exactly the same as what is mentioned above except it checks for different levels
		} else if (parts[0] == 'Ilyx' && parts[7] == '90.') {
			member.roles.add('724326542586544209'); //90
			member.roles.remove('724326545505648640');
			levelup(member, '724326542586544209', message);
			console.log(`role 90 granted to ${message.mentions.members.first().displayName}`);
		} else if (parts[0] == 'Ilyx' && parts[7] == '80.') {
			member.roles.add('724326545505648640'); //80
			member.roles.remove('724326548030619740');
			levelup(member, '724326545505648640', message);
			console.log(`role 80 granted to ${message.mentions.members.first().displayName}`);
		} else if (parts[0] == 'Ilyx' && parts[7] == '70.') {
			member.roles.add('724326548030619740'); //70
			member.roles.remove('724326550224240713');
			levelup(member, '724326548030619740', message);
			console.log(`role 70 granted to ${message.mentions.members.first().displayName}`);
		} else if (parts[0] == 'Ilyx' && parts[7] == '60.') {
			member.roles.add('724326550224240713'); //60
			member.roles.remove('690745957364662332');
			levelup(member, '724326550224240713', message);
			console.log(`role 60 granted to ${message.mentions.members.first().displayName}`);
		} else if (parts[0] == 'Ilyx' && parts[7] == '50.') {
			member.roles.add('690745957364662332'); //50
			member.roles.remove('680210719890997289');
			levelup(member, '690745957364662332', message);
			console.log(`role 50 granted to ${message.mentions.members.first().displayName}`);
		} else if (parts[0] == 'Ilyx' && parts[7] == '40.') {
			member.roles.add('680210719890997289');	//40
			member.roles.remove('675360084561231902');
			levelup(member, '680210719890997289', message);
			console.log(`role 40 granted to ${message.mentions.members.first().displayName}`);
		} else if (parts[0] == 'Ilyx' && parts[7] == '30.') {
			member.roles.add('675360084561231902'); //30
			member.roles.remove('670792654656897025');
			levelup(member, '675360084561231902', message);
			console.log(`role 30 granted to ${message.mentions.members.first().displayName}`);
		} else if (parts[0] == 'Ilyx' && parts[7] == '20.') {
			member.roles.add('670792654656897025');	//20
			member.roles.remove('670792394714644492');
			levelup(member, '670792654656897025', message);
			console.log(`role 20 granted to ${message.mentions.members.first().displayName}`);
		} else if (parts[0] == 'Ilyx' && parts[7] == '10.') {
			member.roles.add('670792394714644492'); //10
			member.roles.remove('650420333261619222');
			levelup(member, '670792394714644492', message);
			console.log(`role 10 granted to ${message.mentions.members.first().displayName}`);
		} else if (parts[0] == 'Ilyx' && parts[7] == '5.') {
			member.roles.add('707153017719226480'); //5
			levelup(member, '707153017719226480', message);
			console.log(`role 5 granted to ${message.mentions.members.first().displayName}`);
		} else if (parts[0] == 'Ilyx' && message.author != '133441735438106624') {
			bot.channels.cache.get('764178925882179624').send("<@" + member + ">" + " Has Leveled up!");
		}
	}
}

// This function is called inside of the parse6 function when a member reaches a high enough level to recieve a new role
function levelup(member, role, message) {
	const avatar = member.user.avatarURL();
	bot.channels.cache.get('764178925882179624').send("<@" + member + ">");

	// This is checking if a user is level 5 so that it can include an extra description for the new abilities 
	if (role == '707153017719226480') {
		message.guild.roles.fetch(role).then(role => bot.channels.cache.get('764178925882179624').send(
			// This is where the embed magic happens!
			exampleEmbed = new Discord.MessageEmbed()
				.setColor(`${role.hexColor}`)
				.setTitle("Milestone achieved! ")
				.setThumbnail(avatar)
				.addField("Congratulations, " + message.mentions.members.first().displayName, "New role: " + `${role.name}.`, true)
				.setDescription("You can now change your nickname and upload files to more channels!")
				.setTimestamp())).catch(console.error);
	} else {
		message.guild.roles.fetch(role).then(role => bot.channels.cache.get('764178925882179624').send(
			exampleEmbed = new Discord.MessageEmbed()
			.setColor(`${role.hexColor}`)
			.setTitle("Milestone achieved! ")
			.setThumbnail(avatar)
				.addField("Congratulations, " + message.mentions.members.first().displayName, "New role: " + `${role.name}.`, true)
			.setTimestamp())).catch(console.error);
    }
}

// Chat filter function that sends messages to a private channel only mods can see
function filter(message) {

	// Each message is filtered through each of the json based list for a match
	const bad = badlist.filter(word => message.content.toLowerCase().includes(word));
	const hate = hatelist.filter(word => message.content.toLowerCase().includes(word));
	const maybe = maybelist.filter(word => message.content.toLowerCase().includes(word));
	const ok = oklist.filter(word => message.content.toLowerCase().includes(word));

	// This first if makes sure the bot doesn't report itself or else "udder" chaos will ensue
	if (message.author != '749657560142839899') {

		// The rest of this is fairly self explanitory. All it does is check to see if any of the above variables have become greater than 0 and then sends an appropriate message based on the severity of the word
		if (maybe.length > 0) {
			if (bad.length > 0) {
				console.log(`${message.author.tag} tried to use slurs.`);
				bot.channels.cache.get('728711034902151249').send("<@&650418925376634890> <@&671250829969457156>, " + "<@" + message.author + ">" + " tried to use slurs. " + message.url);
				//return message.delete().catch(console.error);
			}
			else if (ok.length > 0) {
				//console.log(`${message.author.tag} Slur exception.`);
			} else {
				console.log(`${message.author.tag} said something that might include slurs.`);
				bot.channels.cache.get('728711034902151249').send("<@" + message.author + ">" + " said something that might include slurs. " + message.url);
			}
		} else if (bad.length > 0) {
			console.log(`${message.author.tag} tried to use slurs.`);
			bot.channels.cache.get('728711034902151249').send("<@&650418925376634890> <@&671250829969457156>, " + "<@" + message.author + ">" + " tried to use slurs. " + message.url);
			//return message.delete().catch(console.error);
		}
		if (hate.length > 0) {
			console.log(`${message.author.tag} might be causing drama or hate speech.`);
			bot.channels.cache.get('728711034902151249').send("<@" + message.author + ">" + " might be causing drama or hate speech. " + message.url);
		}
	}
}

bot.login(token);