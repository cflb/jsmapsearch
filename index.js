/*const makeDiv = (id_name, childName) => {
    var div = document.createElement('div');
    div.setAttribute('id', id_name);
    document.getElementById(childName).appendChild(div);
};*/

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

    var coordenada = 'generateMap(' + String(data.center[0]) + ',' + String(data.center[1]) + ',' + '"' + data.place_name + '"' + ')';
    console.log(coordenada);
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


const createMapID = () => {
    var div = document.createElement('div');
    div.setAttribute('id', 'mapid');
    document.getElementById('mapa').appendChild(div);
    document.getElementById('mapid').setAttribute('style', 'width: 800px; height: 600px;');
}

const clearMapArea = () => {
    document.getElementById('mapa').innerHTML = '';
}

const load = () => {
    var img = document.createElement('img');
    img.setAttribute('src', 'img/load.gif');
    document.getElementById('mapa').appendChild(img);
}

const generateMap = (lat, long, info) => {
    load();
    clearMapArea();
    createMapID();
   
//    setInterval(function(){ load(); }, 3000);

    var mymap = L.map('mapid').setView([long, lat], 15);
    
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2ZsYmVkdWNhdG9yIiwiYSI6ImNrMTZrYm1vNTA1dWEzaGxqN2tmMTZlazcifQ.XXsWkpgiguegb-C7WQpGBA', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);
    
	L.marker([long, lat]).addTo(mymap)
		.bindPopup("<b>Você está vendo!</b><br />" + info).openPopup();
    
	L.circle([long, lat], 200, {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5
	}).addTo(mymap).bindPopup("Área aproximada");
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
                    //console.log(element)
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

