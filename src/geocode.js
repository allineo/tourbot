var axios = require('axios');


exports.buscaCep = async function (endereco) {
    try {
        if (endereco.cep != null) {
            const url = 'https://viacep.com.br/ws/' + endereco.cep + '/json/';
            const data = await axios.get(url)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
            if (data != null) {
                endereco['logradouro'] = data.logradouro;
                endereco['bairro'] = data.bairro;
                endereco['localidade'] = data.localidade;
                endereco['uf'] = data.uf;
            }
            return endereco;
        }
    } catch (_error) {
        console.log("buscaCep " + _error);
    }
}


/*exports.buscaEndereco = async function (endereco) {
    try {
        var rualimpa = endereco["endereco"].replace(/[^a-zA-Z\u00C0-\u00FF ]/g, "");
        //rualimpa = rualimpa.replace("Jardim Primavera", "").replace("Jardim primavera", "").replace("jardim primavera", "").replace("jardim Primavera", "");
        //rualimpa = rualimpa.replace("Inhaúma", "").replace("inhaúma", "").replace("inhauma", "");
        //rualimpa = rualimpa.replace("Complexo do Alemão", " ").replace("Complexo do alemão", " ").replace("complexo do alemão", " ").replace("alemão", " ");
        //rualimpa = rualimpa.replace("PENHA", " ").replace("Penha", " ").replace("penha", " ");
        //endereco["comunidade"] = 'Complexo do Alemão';

        rualimpa = rualimpa.replace("casa", " ").replace("fundos", " ").replace("Fundos", " ").replace("beco", " ");
        rualimpa = rualimpa.replace("número", " ").replace("Número", " ").replace("numero", " ")
            .replace(" n ", " ").replace("n°", " ").replace("n:", " ").replace("N:", " ");
        rualimpa = rualimpa.replace("apto", " ").replace("Apto", " ").replace("apartamento", " ").replace("Apartamento", " ").replace("bloco", " ").replace("Bloco", " ");

        var numero = endereco["endereco"].replace(/[^0-9]/g, " ").trim();
        endereco["numero"] = numero;

        // https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBj2DWdvCQnzpvpN9nNheZoS2zhWZQRJ5s

        let enderecoString = rualimpa + " - Rio de Janeiro - RJ ";
        let options = {
            host: 'maps.googleapis.com',
            path: '/maps/api/geocode/json?key=AIzaSyBj2DWdvCQnzpvpN9nNheZoS2zhWZQRJ5s&address=' + encodeURI(enderecoString.trim()),
            method: "POST"
        };
        callback = async function (response) {
            var str = '';
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                strJSON = JSON.parse(str);
                results = strJSON.results;
                if (results[0] != null) {
                    console.log(results[0].formatted_address);
                    endereco["latitude"] = results[0].geometry.location.lat;
                    endereco["longitude"] = results[0].geometry.location.lng;
                    /* const location = (results[0].geometry.location);
                     if (location != null && location.lat() != null) {
                         endereco["latitude"] = location.lat();
                         endereco["longitude"] = location.lng();
                     } else {
                         endereco["latitude"] = location;
                     }* /

                    var address = results[0].address_components;
                    for (var i = 0; i < address.length; i++) {
                        if (address[i].types.includes("route")) {
                            endereco["rua"] = address[i].long_name;
                        }
                        if (address[i].types.includes("street_number")) {
                            endereco["numero"] = address[i].long_name;
                        }
                        if (address[i].types.includes("sublocality")) {
                            endereco["bairro"] = address[i].long_name;
                        }
                        if (address[i].types.includes("postal_code")) {
                            endereco["cep"] = address[i].long_name;
                        }
                        //"administrative_area_level_2"
                        //"administrative_area_level_1" = cidade
                        //"country"
                    }
                } else {
                    console.log("Geocode was not successful for the following reason: " + str);
                }
                endereco["cidade"] = "Rio de Janeiro";
                endereco["uf"] = "RJ";
                if (endereco["numero"] == null || endereco["numero"] == '') {
                    endereco["numero"] = endereco["endereco"].replace(/[^0-9]/g, "");
                }

                if (endereco["comunidade"] == null || endereco["comunidade"] == '') {
                    if (endereco["endereco"].toLowerCase().trim().includes("alemão")) {
                        endereco["comunidade"] = "Complexo do Alemão";
                    } else if (endereco["endereco"].toLowerCase().trim().includes("penha")) {
                        endereco["comunidade"] = "Penha";
                    } else if (endereco["endereco"].toLowerCase().trim().includes("borel")) {
                        endereco["comunidade"] = "Morro do Borel";
                    } else if (endereco["endereco"].toLowerCase().trim().includes("galinha")) {
                        endereco["comunidade"] = "Comunidade da Galinha";
                    } else if (endereco["endereco"].toLowerCase().trim().includes("inhaúma")) {
                        endereco["comunidade"] = "Inhaúma";
                    }
                }
                return endereco;
            });
        }

        let request = await https.request(options, callback);
        request.end();
        return endereco;

    } catch (_error) {
        console.log("geocode " + _error);
    }
}*/

