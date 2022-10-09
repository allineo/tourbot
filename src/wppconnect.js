//const wppconnect = require('@wppconnect-team/wppconnect');

// https://wppconnect-team.github.io/wppconnect/index.html
// npm i --save @wppconnect-team/wppconnect
// jontewks/puppeteer
// https://br.qr-code-generator.com


exports.sendWppMessage = function (wppConnectClient, sendTo, text) {
    wppConnectClient.sendText(sendTo, text)
        .then((result) => {
            // console.log('SUCESSO: ', result); 
        })
        .catch((erro) => {
            console.error('ERRO: ', erro);
        });
}