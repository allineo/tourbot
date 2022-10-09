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
            switch (command) {
                case 'Flutuação':
                    await toursOptions.toursFlutuacao(client, message, chat);
                    break;
                case 'Trilhas e Cachoeiras':
                    await toursOptions.toursTrilhas(client, message, chat);
                    break;
                case 'Aventura/Adrenalina':
                    await toursOptions.toursAventura(client, message, chat);
                    break;
                default:
                    menuCommandos(client, message);
                    break;
            }
            stage = 'tourstipos';


        } else if (stage == 'tourstipos') {
            toursList(client, message, command, chat);

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

function toursList(client, message, command, chat) {
    switch (command) {
        case 'Balneário Municipal':
            tours.BalnearioMunicipal(client, message, chat);
            break;
        case 'Lagoa Misteriosa':
            tours.LagoaMisteriosa(client, message, chat);
            break;
        default:
            menuCommandos(client, message);
            break;
    }
}