
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

let url ='https://api.punkapi.com/v2/beers'; //url will change depending on choice!

//filters
abvForm.addEventListener("change", e => {
    let value = e.target.value;
    switchOptions(value, optionsABV);
});

ibuForm.addEventListener("change", e => {
    let value = e.target.value;
    switchOptions(value, optionsIBU);
});

//might not work for both -- since i need specific URL edits
function switchOptions(value, options) {
    console.log("switch options is working");
    switch (value) {
        case "all":
            if(options === optionsABV) {
                //ABV
                
                options = "";
            } else {
                //IBU
                options = "";
            }
            break; 
        case "low":
            if(options === optionsABV) {
                //ABV
                options = "abv_lt=4.5";
            } else {
                //IBU
                options = "ibu_lt=";
            }
            break;
        case "med":
            if(options === optionsABV) {
                //ABV
                options = "";
            } else {
                //IBU
                options = "";
            }
            break;
        case "high":
            if(options === optionsABV) {
                //ABV
                options = "";
            } else {
                //IBU
                options = "";
            }
            break;
    }
}

async function fetchMe(url) {

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
        cardDiv.appendChild(img);


        //beer info and append all that into one card
        cardDiv.textContent = `Your beer is: ${beer.name}, ${beer.tagline}`;
        infoCard.textContent = `ABV: ${beer.abv} IBU: ${beer.ibu}`;
        cardDiv.appendChild(infoCard);
        cardDiv.appendChild(img);


        resultCard.appendChild(cardDiv);
    });

    }

    //create all the beer card elements
    function createDiv(className) {
        let div = document.createElement('div');
        div.classList.add("beer", className);
        return div;
    }

    //will have to call this by default, but then override it with whatever selectors the user chooses each time
    fetchMe(url);