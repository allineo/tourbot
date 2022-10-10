const { Buttons, List } = require('whatsapp-web.js');
const utilities = require('./utilities.js');
const toursOptions = require('./toursOptions.js');
const tours = require('./tours.js');


exports.getCommands = async function (client, message, stage) {
    let chat = await message.getChat();
    try {
        console.log('stage ' + stage);
        const command = message.body;
        if (stage == '' || stage == undefined) {
            await welcomeMessage(chat);
            menuCommandos(client, message);
            stage = 'experiencias';
            
        } else if (stage == 'experiencias') {
            toursTipos(client, message, command, chat, stage);
            stage = 'tourstipos';
            
        } else if (stage == 'tourstipos') {
            toursList(client, message, command, chat, stage);
            stage = 'experiencias';

        } else if (command == 'Voltar') {
            menuCommandos(client, message);
            stage = 'experiencias';
        }
    } catch (_error) {
        console.log(_error);
    }
    return stage;
}


async function welcomeMessage(chat) {
    const welcomemessage = 'Bem vindo ao atendimento da \n' +
        '     *WELKER  TOUR*\nespecializada em Bonito - MS!\n\n';
    const imageName = 'logoWelkerTour.jpg';
    await utilities.sendImage(chat, imageName, welcomemessage);
}



function verifyMessage(msg) {
    let msgClean = msg.toLowerCase().replace(/[^a-zA-Z0-9]/, '');
    if (msgClean == 'oi' || msgClean == 'ola' || msgClean == 'olá') {
        return '';
    } else {
        return msg;
    }
}


function menuCommandos(client, message) {
    let title = "Qual tipo de experiência gostaria de mais informações?";
    let button = new Buttons(title,
        [{ body: 'Flutuação' },
        { body: 'Trilhas e Cachoeiras' },
        { body: 'Aventura/Adrenalina' }]);
    client.sendMessage(message.from, button);

    /*let sections = [{
        title: 'sectionTitle',
        rows: [{ title: 'ListItem1', description: 'desc' }, { title: 'ListItem2' }]
    }];
    let list = new List(title, 'btnText', sections, 'Title', 'footer');
    client.sendMessage(message.from, list);*/
}



function toursTipos(client, message, command, chat, stage) {
    switch (command) {
        case 'Flutuação':
            toursOptions.toursFlutuacao(client, message, chat);
            break;
        case 'Trilhas e Cachoeiras':
            toursOptions.toursTrilhas(client, message, chat);
            break;
        case 'Aventura/Adrenalina':
            toursOptions.toursAventura(client, message, chat);
            break;
        default:
            menuCommandos(client, message);
            stage = 'experiencias';
            break;
    }
}


function toursList(client, message, command, chat, stage) {
    switch (command) {
        case 'Balneário Municipal':
            tours.BalnearioMunicipal(client, message, chat);
            break;
        case 'Lagoa Misteriosa':
            tours.LagoaMisteriosa(client, message, chat);
            break;
        case 'Aquário Natural':
            tours.LagoaMisteriosa(client, message, chat);
            break;
        case 'Boca da Onça Ecotur':
            tours.LagoaMisteriosa(client, message, chat);
            break; 
        case 'Ceita Corê':
            tours.LagoaMisteriosa(client, message, chat);
            break;
        case 'Estância Mimosa':
            tours.LagoaMisteriosa(client, message, chat);
            break;   
        case 'Flutuação Abismo Anhumas':
            tours.LagoaMisteriosa(client, message, chat);
            break; 
        case 'Rapel e Trilha Boca da Onça':
            tours.LagoaMisteriosa(client, message, chat);
            break;  
        case 'Grutas de São Miguel':
            tours.LagoaMisteriosa(client, message, chat);
            break; 
        default:
            menuCommandos(client, message);
            stage = 'experiencias';
            break;
    }
}