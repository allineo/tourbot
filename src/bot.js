// https://github.com/pedroslopez/whatsapp-web.js
// npm i github:pedroslopez/whatsapp-web.js#fix-buttons-list

//const wppconnect = require('@wppconnect-team/wppconnect');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrCode = require('qrcode-terminal');
const fs = require('fs');

//const signup = require('./signup.js');
const commands = require('./commands.js');
//const firebasedb = require('./firebase.js');
 


let userStages = [];

//---------------------------------------------

const SESSION_FILE_PATH = './session.json';
let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}


const client = new Client();

/*const client = new Client({
    puppeteer: {
        executablePath: '/path/to/Chrome',
    }
})*/
 

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrCode.generate(qr, { small: true });
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});


client.on('message', msg => {
    if (msg.body == 'ping') {
        msg.reply('pong');
    }
});

client.initialize();
//console.log(client);


client.on('message', message => {
    try {
        if (message.from != 'status@broadcast') { // && message.isGroupMsg === false
            console.log('Usuário atual from:' + message.from + ' - to: ' + message.to);
            console.log('Mensagem digitada pelo usuário: ' + message.body);
            queryUserByPhone(client, message);
        }
    } catch (_error) {
        console.log(_error);
    }
});

async function queryUserByPhone(client, message) {
    let phone = (message.from).replace(/[^\d]+/g, '');
    //let phone = '5521972229720';
    if (phone != '') {
        userStages[message.from] = await commands.getCommands(client, message,
             userStages[message.from]);
    }
}