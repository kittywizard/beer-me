const resultCard = document.getElementById('resultCard');
const btn = document.getElementById('btn');

let url ='https://api.punkapi.com/v2/beers/random';

btn.addEventListener('click', fetchMe);

async function fetchMe() {

    let fetchBeer = await fetch(url);
    let json = await fetchBeer.json();

    console.log(json);
    let beerName = json[0].name;
    let beerABV = json[0].abv;
    let beerIBU = json[0].ibu;
    let beerTagline = json[0].tagline;
    // need to adjust for when multiple beers get pulled in
    
    let cardDiv = document.createElement('div');
    cardDiv.textContent = `Your beer is: ${beerName}`;
    cardDiv.classList.add('result-card');
    resultCard.appendChild(cardDiv);
    }
