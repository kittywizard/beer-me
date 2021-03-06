 

const resultCard = document.querySelector(".results");
const testBtn = document.getElementById('test-btn');
const pages = document.querySelector(".page-card"); //for turning them on and off
const favList = document.getElementById('fav-list');
const favUL = document.querySelector('.fav-ul');

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

function clearStorage() {
    //delete everything from local storage on page load for testing purposes
    //need to see if adding things works correctly!
    localStorage.clear();
}

async function fetchMe(url) {

    resultCard.innerHTML = '';
    favCollection = [];
    beerCollection = [];
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
                            <br> <span class="beer-name"><strong class="bold-beer">${beer.name}</strong> <br> ${beer.tagline}</span>`;
        infoCard.innerHTML = `<strong>ABV:</strong> ${beer.abv} <strong>IBU:</strong> ${beer.ibu}`;
        cardDiv.appendChild(infoCard);
        cardDiv.appendChild(img);

        resultCard.appendChild(cardDiv);

        beerCollection.push(beer.name);
    });

    favoriteSystem();

}

//unhides and adds to the favorites list displayed at the top of the screen
function createModal(item) {
    favList.classList.remove('hide');
    let list = document.createElement('li');
    list.textContent = item;
    favUL.append(list);
}

//create all the beer card elements
function createDiv(className) {
    let div = document.createElement('div');
    div.classList.add("beer", className);
    return div;
}

function favoriteSystem() {
    //gather all the hearts 
    let favorite = document.querySelectorAll(".favorite");

    //fas = solid heart, like
    //far = outline, remove from storage

    favorite.forEach((fav, index) => {
        fav.addEventListener('click', () => {
            fav.classList.toggle('fas');
            fav.classList.toggle('far');

            if (fav.classList.contains('fas')) {
                favCollection.push(beerCollection[index]);
                
                //local storage key pair needs to be unique
                localStorage.setItem(`${index} favorite`, JSON.stringify(beerCollection[index]));

                createModal(beerCollection[index]); 

            } else {
                //remove from storage
                localStorage.removeItem(`${index} favorite`);

                let li = document.getElementsByTagName('li');

                for(let i = 0; i < li.length; i++) {
                    if (li[i].innerText === beerCollection[index])  li[i].remove();
                }

                //then splice it out of the array
                favCollection.splice(index, 1);

                //need to check and remove the modal if there's no li children in the UL
                if(li.length == 0) favList.classList.add('hide');
            }

        });
    });
}

//will have to call this by default, but then override it with whatever selectors the user chooses each time
fetchMe(url);