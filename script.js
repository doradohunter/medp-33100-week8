const API_URL = 'https://api.citybik.es/v2/networks/citi-bike-nyc';
let data;

async function fetchApiData() {
    const response = await fetch(API_URL);
    if (response.ok) {
        data = await response.json();
        console.log(data);
        return data;
    }
    return [];
}

let longitude_array = [];
let latitude_array = [];
let names_array = [];
let colors = [];

fetchApiData()
    .then((data) => {
    plot(data.network.stations)
})

function plot(stations){
    longitude_array = [];
    latitude_array = [];
    names_array = [];
    colors = [];

    for (let i = 0; i < stations.length; i++){
        longitude_array.push(stations[i].longitude)
        latitude_array.push(stations[i].latitude)
        names_array.push(stations[i].name)

        //green
        if((stations[i].free_bikes / stations[i].extra.slots) > 0.75){
            colors.push("#00FF00");
        }
        //red
        else if((stations[i].free_bikes / stations[i].extra.slots) < 0.20){
            colors.push("#FF0000")
        }
        //yellow
        else{
            colors.push("#FFFF00")
        }

    }
    var mapboxAccessToken = 'pk.eyJ1IjoiYXAwMyIsImEiOiJjbHUxNGw4Y3gwOXZnMmlycDZzcTJjanBoIn0.YGzqXAyaC6xDXmcwpVWTLA';

    var data = [{
        type: 'scattermapbox',
        mode: 'markers+text',
        lon: longitude_array,
        lat: latitude_array,
        text: names_array,
        marker: {
            size: 5,
            color: colors,
            line: {
                width: 1
            }
        }
    }];

    var layout = {
        title: {
            text: 'NYC Citi Bike Stations',
            font: {
                family: 'Droid Serif, serif',
                size: 24
            }
        },
        mapbox: {
            center: {
                lon: -73.935242, // NYC center longitude
                lat: 40.730610,  // NYC center latitude
            },
            zoom: 10,
            style: 'streets',
            accesstoken: mapboxAccessToken
        }
    };

    Plotly.newPlot('content', data, layout);
}
const ebike_button = document.querySelector(".ebike-button");
ebike_button.addEventListener('click', getStationByEbike)
let button_status = 0

//used chatGPT to figure out how to filter through the stations to only show those with E bikes and toggle button
function getStationByEbike(){
    button_status = !button_status;
    if (button_status){
        const ebikeStations = data.network.stations.filter(station => station.extra.ebikes !== 0);
        plot(ebikeStations);
        bike_button.innerHTML = "All Stations"
    }
    else {
        ebike_button.innerHTML = "Stations with E-Bikes"
        plot(data.network.stations);
    };
}