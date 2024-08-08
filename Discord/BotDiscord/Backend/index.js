const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const cors = require('cors');
const app = express();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers 
    ]
});

const token = 'MTI3MTAwNzk3OTA1MDg5MzM3Mw.GGqJFk.Q15egTXGRXa6nJi2euGXro1bnZn_b4GmxPEk0U';
let botStatus = 'Offline';

app.use(cors());
app.use(express.json());

app.get('/status', (req, res) => {
    res.json({ status: botStatus });
});

app.post('/command', (req, res) => {
    const { command } = req.body;
    if (command === 'hello') {
        res.json({ response: 'Hello there!' });
    } else if (command === 'ping') {
        res.json({ response: 'Pong!' });
    } else {
        res.json({ response: 'Unknown command' });
    }
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    botStatus = 'Online';
});

client.on('messageCreate', message => {
    if (message.author.bot) return;
    if (message.content === '!hello') {
        message.channel.send('Hello there!');
    }
    if (message.content === '!ping') {
        message.channel.send('Pong!');
    }
    if (message.content === '!react') {
        message.react('👍');
    }
});

client.login(token);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
