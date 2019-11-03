const makeDiv = (id_name) => {
    var div = document.createElement('div');
    div.setAttribute('id', id_name);
    document.body.appendChild(div);
};

const makeUL = () => {
    var ul = document.createElement('ul');
    ul.setAttribute('id', 'lista-resultados');
    ul.setAttribute('class', 'collection');
    document.getElementById('main').appendChild(ul);
};

const makeLI = (data) => {
    var li = document.createElement('li');
    li.setAttribute('id', 'item');
    li.setAttribute('class', 'collection-item');

    var coordenada = 'generateMap(' + String(data.center[0] + ',' + String(data.center[1] + ')'))

    var item = document.createTextNode(data.place_name);

    var link = document.createElement('a');
    link.setAttribute('onclick', coordenada);

    link.setAttribute('href', '#!');
    link.appendChild(item);
    li.appendChild(link);
    //li.setAttribute('onclick', 'makeMap()');
    document.getElementById('lista-resultados').appendChild(li);
};

const getLink = () => {
    return "https://api.mapbox.com/geocoding/v5/mapbox.places/" + document.getElementById('search').value + ".json?access_token=pk.eyJ1IjoiY2ZsYmVkdWNhdG9yIiwiYSI6ImNrMTZrYm1vNTA1dWEzaGxqN2tmMTZlazcifQ.XXsWkpgiguegb-C7WQpGBA"
}

var resposta;
const getQuery = () => {
    
    var xmlhttpquery = new XMLHttpRequest();
    var url = getLink();
    xmlhttpquery.open('GET', url, true);

    xmlhttpquery.onreadystatechange = function(e) {
        if (this.readyState){
            if (this.readyState == 0){
                console.log('aguardando conexao...');
            } if (this.readyState == 2){
                console.log('conexao feita...');
            } if (this.readyState == 3){
                console.log('Fazendo download de dados...');
            } if (this.readyState == 4){
                resposta = JSON.parse(this.response);
                resposta.features.forEach(element => {
                    makeLI(element);
                    console.log(element)
                });
                console.log('Dados disponiveis...');
            }
        }
        /*if (this.readyState == 4){
            resposta = JSON.parse(this.response);
            resposta.features.forEach(element => {
                console.log(element)
            });
        }*/
    }
    xmlhttpquery.send();
}



//uma main vai ficar aqui!!
makeUL();

