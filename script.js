const resultCard = document.getElementById('resultCard');
const btn = document.getElementById('btn');

let url ='https://api.punkapi.com/v2/beers/random';

btn.addEventListener('click', fetchMe);

//will need multiple listeners on the various buttons chosen
    //ABV
    //IBU

async function fetchMe() {

    let fetchBeer = await fetch(url);
    let json = await fetchBeer.json();

    console.log(json);

    json.forEach(beer => {

        let cardDiv = createDiv('result-card');
        let infoCard = createDiv('info-card');
        let imgDiv = createDiv('img-div');
        let img = document.createElement('img');
        img.src = beer.image_url;
        img.classList.add('img-div');
        imgDiv.appendChild(img);


        cardDiv.textContent = `Your beer is: ${beer.name}, ${beer.tagline}`;
        infoCard.textContent = `ABV: ${beer.abv} IBU: ${beer.ibu}`;
        
        resultCard.appendChild(imgDiv);
        resultCard.appendChild(cardDiv);
        cardDiv.appendChild(infoCard);
    });

    }

    function createDiv(className) {
        let div = document.createElement('div');
        div.classList.add(className);
        return div;
    }
