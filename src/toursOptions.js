const { Buttons } = require('whatsapp-web.js');
const utilities = require('./utilities.js');

exports.toursFlutuacao = async function (client, message, chat) {
    const imageName = 'Flutuação.jpg';
    utilities.sendImage(chat, imageName);

    let title = "Passeios com Flutuação:\n" +
            "Qual deseja saber mais?";
    let button = new Buttons(title,
        [{ body: 'Balneário Municipal' },
        { body: 'Aquário Natural' },
        { body: 'Lagoa Misteriosa' },
        { body: 'Rio Sucuri' },
        { body: 'Rio da Prata' },
        { body: 'Voltar' }]);
    client.sendMessage(message.from, button);
}


exports.toursTrilhas = async function (client, message, chat) {
    const imageName = 'Trilhas.jpg';
    utilities.sendImage(chat, imageName);

    let title = "Passeios com Trilhas e Cachoeiras:\n" +
            "Qual deseja saber mais?";
    let button = new Buttons(title,
        [{ body: 'Boca da Onça Ecotur' },
        { body: 'Ceita Corê' },
        { body: 'Estância Mimosa' },
        { body: 'Voltar' }]);
    client.sendMessage(message.from, button);
}


exports.toursAventura = async function (client, message, chat) {
    const imageName = 'Aventuras.jpg';
    utilities.sendImage(chat, imageName);

    let title = "Aventuras com muito adrenalina:\n" +
        "Qual deseja saber mais?";
    let button = new Buttons(title,
    [{ body: 'Flutuação Abismo Anhumas' },
    { body: 'Rapel e Trilha Boca da Onça' },
    { body: 'Grutas de São Miguel' },
    { body: 'Voltar' }]);
    client.sendMessage(message.from, button);
}


