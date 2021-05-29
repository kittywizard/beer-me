// TO DO:
// not all the beers have images - need a generic beer placeholder image
// set up function to fix the fetch call
// the UI 

const resultCard = document.querySelector(".results");
const testBtn = document.getElementById('test-btn');
const pages = document.querySelector(".page-card"); //for turning them on and off

//forms and form related nonsense
const abvForm = document.getElementById("ABV-form");
const ibuForm = document.getElementById("IBU-form");
const pageForm = document.getElementById("page-form");
let optionsABV = "";
let optionsIBU = "";

//array for favoriting
let beerCollection = [];
let favCollection = [];

let url = 'https://api.punkapi.com/v2/beers?'; //url will change depending on choice!

//filters
abvForm.addEventListener("change", e => {
    let value = e.target.value;
    let name = e.target.name;
    switchOptions(name, value, optionsABV);
});

ibuForm.addEventListener("change", e => {
    let value = e.target.value;
    let name = e.target.name;
    switchOptions(name, value, optionsIBU);
});


function switchOptions(name, value, options) {

    switch (value) {
        case "all":
            if (name === "ABV") {
                //ABV
                options = "";
            } else {
                //IBU
                options = "";
            }
            break;
        case "low":
            if (name === "ABV") {
                //ABV
                options += "&abv_lt=4.5";
            } else {
                //IBU
                options += "&ibu_lt=30";
            }
            break;
        case "med":
            if (name === "ABV") {
                //ABV
                options += "&abv_lt=6.5&abv_gt=4.5";
            } else {
                //IBU
                options += "&ibu_lt=50&ibu_gt=30";
            }
            break;
        case "high":
            if (name === "ABV") {
                //ABV
                options += "&abv_gt=6.5";
            } else {
                //IBU
                options += "&ibu_gt=50";
            }
            break;
    }
    url += options;
    fetchMe(url);
}

async function fetchMe(url) {

    resultCard.innerHTML = '';
    //pages.classList.toggle('hide');

    let fetchBeer = await fetch(url);
    let json = await fetchBeer.json();

    json.forEach(beer => {

        let cardDiv = createDiv('result-card');
        let infoCard = createDiv('info-card');

        //create image for the beer card
        let img = document.createElement('img');
        img.src = beer.image_url;
        img.classList.add('img-div');


        //beer info and append all that into one card
        cardDiv.innerHTML = `<i class="far fa-heart favorite"></i>
                             Your beer is: <strong>${beer.name}</strong>, ${beer.tagline}`;
        infoCard.innerHTML = `<strong>ABV:</strong> ${beer.abv} <strong>IBU:</strong> ${beer.ibu}`;
        cardDiv.appendChild(infoCard);
        cardDiv.appendChild(img);

        resultCard.appendChild(cardDiv);

        beerCollection.push(beer.name);
    });

    let favorite = document.querySelectorAll(".favorite");

    //fas = solid heart, like
    //far = outline, remove from storage

    favorite.forEach((fav, index) => {
        fav.addEventListener('click', () => {
            fav.classList.toggle('fas');
            fav.classList.toggle('far');
            if (fav.classList.contains('fas')) {
                favCollection.push(beerCollection[index]);
               localStorage.setItem('favorite', JSON.stringify(favCollection));
                //add to local storage
            } else {

                //remove from storage
            }

        });
    });
    console.log(localStorage)
}

//create all the beer card elements
function createDiv(className) {
    let div = document.createElement('div');
    div.classList.add("beer", className);
    return div;
}

//will have to call this by default, but then override it with whatever selectors the user chooses each time
fetchMe(url);