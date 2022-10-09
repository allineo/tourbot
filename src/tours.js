const { Buttons, List } = require('whatsapp-web.js');
const utilities = require('./utilities.js');

exports.BalnearioMunicipal = async function (client, message, chat) {
    const imageName = 'Balneário Municipal.jpg';
    utilities.sendImage(chat, imageName);

    let title = "*Balneário Municipal*\n" +
        "Saiba mais aqui\n" +
        "acquaviagens.com.br/passeios-em-bonito-ms/balnearios/balneario-municipal/18/";
    let button = new Buttons(title,
        [{ body: 'Video' },
        { body: 'Dias e horários' },
        { body: 'Reserva' },
        { body: 'Voltar' }]);
    client.sendMessage(message.from, button);
}


exports.LagoaMisteriosa = async function (client, message, chat) {
    const imageName = 'Lagoa Misteriosa.jpg';
    utilities.sendImage(chat, imageName);

    let title = "*Lagoa Misteriosa*\n" +
        "Saiba mais aqui\n" +
        "acquaviagens.com.br/passeios-em-bonito-ms/flutuacoes/lagoa-misteriosa/6/";
   let button = new Buttons(title,
        [{ body: 'Video' },
        { body: 'Dias e horários' },
        { body: 'Reserva' },
        { body: 'Voltar' }]);
    client.sendMessage(message.from, button);

  /*  let sections = [{
        title: title,
        rows: [{ title: 'Video', description: 'desc' }, 
        { title: 'Dias e horários', description: 'desc' },
        { title: 'Reserva' },
        { title: 'Voltar' }]
    }];
    let list = new List(title, 'btnText', sections, 'Title', 'footer');
    client.sendMessage(message.from, list);*/
}


