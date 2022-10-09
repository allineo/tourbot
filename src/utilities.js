const { MessageMedia } = require('whatsapp-web.js');


exports.sendImage = async function (chat, imageName, caption) {
    const media = MessageMedia.fromFilePath('./images/' + imageName);
    await chat.sendMessage(media, {caption: caption});
}

exports.isEmail = function (email) {
    // tslint:disable-next-line: max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


exports.validacpf = function (cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    var result = true;
    [9, 10].forEach(function (j) {
        var soma = 0, r;
        cpf.split(/(?=)/).splice(0, j).forEach(function (e, i) {
            soma += parseInt(e) * ((j + 2) - (i + 1));
        });
        r = soma % 11;
        r = (r < 2) ? 0 : 11 - r;
        if (r != cpf.substring(j, j + 1)) result = false;
    });
    return result;
}


exports.formatDate = function (day) {
    const today = new Date().getDate();
    const yesterday = (new Date(Date.now() - (86400000 * 1))).getDate();
    const beforeYesterday = new Date(Date.now() - (86400000 * 2));

    if (today == day) {
        return 'Hoje';
    } else if (yesterday == day) {
        return 'Ontem';
    } else if (beforeYesterday.getDate() == day) {
        return beforeYesterday.toISOString().split('T')[0];
    }
}

exports.convertCents = function (centsvalue) {
    if (centsvalue != null) {
        cents = centsvalue + '';
        if (cents == '0') {
            cents = '000';
        }
        return cents.slice(0, -2) + ',' + (cents.slice(-2) + '');
    }
}


exports.verificaDeMenor = function (datanascimento) {
    return (new Date().getUTCFullYear()) - Math.abs(datanascimento.getUTCFullYear());
}


exports.convertNascimento = function (nascimentoString) {
    let nascimentoArray = nascimentoString.split('/');
    if (nascimentoArray[0].replace(/[^\d]+/g, '').length == 8) {
        nascimento = nascimentoArray[0].replace(/[^\d]+/g, '');
        nascimento = new Date(nascimentoArray[0].substring(0, 2) + '-'
            + nascimentoArray[0].substring(2, 4) + '-' + nascimentoArray[0].substring(4) + ' 12:00');
    } else {
        nascimento = new Date(nascimentoArray[2] + '-' + nascimentoArray[1] + '-' + nascimentoArray[0] + ' 12:00');
    }
    return nascimento;
}

exports.verificaCNPJ = function (cpf) {
    if (cpf.length == 14) {
        return true;
    }
    return false;
}
