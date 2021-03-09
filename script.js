const resultCard = document.getElementById('resultCard');
const testBtn = document.getElementById('test-btn');
const pages = document.querySelector(".page-card"); //for turning them on and off

//pull in the forms 
const abvForm = document.getElementById("ABV-form");
const ibuForm = document.getElementById("IBU-form");
const pageForm = document.getElementById("page-form");

testBtn.addEventListener('click', () => {
    //need to figure out which one was selected!
    console.log("test");
    let ABVresult = abvForm.value;
    console.log(ABVresult);
    //then send off the fetch with the appropriate URL

    //fetchMe('https://api.punkapi.com/v2/beers?abv_gt=0&abv_lt=2.5')
});

//let url ='https://api.punkapi.com/v2/beers/random'; //url will change depending on choice!

//testBtn.addEventListener('click', fetchMe);

//will need multiple listeners on the various buttons chosen
    //ABV

    //IBU

async function fetchMe(url) {

    pages.classList.toggle('hide');

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
        div.classList.add("beer", className);
        return div;
    }
