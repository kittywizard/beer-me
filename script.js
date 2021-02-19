const test = document.getElementById('test');
const btn = document.getElementById('btn');

let url ='https://api.punkapi.com/v2/beers/random';

btn.addEventListener('click', fetchMe);

async function fetchMe() {

    let fetchBeer = await fetch(url);
    let json = await fetchBeer.json();

    console.log(json);
    
    }
