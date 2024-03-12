//get dom elements and add event listeners
const input = document.querySelector('input');
input.addEventListener('change', getCocktail);

// get the search box (input):
//get the select menu which is for choosing an ingredient
const selectMenu = document.querySelector('select');
selectMenu.addEventListener('change', getCocktail);

// get Random Cocktai btn
// click Random Cocktail btn to call function
const button = document.querySelector('button');
button.addEventListener('click', getCocktail);

//make the select menu options dynamically
//letter-box div for the letter buttons
const letterBox = document.querySelector('#letter-box')

//cocktail box div for the output
const cocktailBox = document.querySelector('#cocktail-box');

cocktailkKeywords.sort();
//create letter search
cocktailkKeywords.forEach(word => {
    const option = document.createElement('option');
    option.value = word.toLowerCase(); //lemon
    option.text = word; // Lemon
    selectMenu.appendChild (option);
});

//letter string
const letters = "ABCDEFGHIJKLMNOPQRSTVWYZ"

//loop through letters
for(let letter of letters) {
    const btn = document.createElement('button');
    btn.id = letter;
    btn.className = 'letter-btn';
    btn.textContent = letter;
    letterBox.appendChild(btn); 
    btn.addEventListener('click', getCocktail); //add event list on each button
}

// define getCocktail() function:
function getCocktail () {
    let baseURL = "thecocktaildb.com/api/json/v1/1/";
    let url = baseURL;
    //concat URL to make request to API end point
    //if the ting that called the value has a value it's NOT the button
    if(this.value) { // fxn called by input text bx or slect menu
        //concatinate a "search concltail by name" request.
       url += `search.php?s=${this.value}`; //this.value is form input box or select menu
    } else if (this.id.length == 1) { 
        url += `search.php?f=${this.id}`; //search by FIRST letter
    } else {//this does not have a value so much be button calling
        url += "random.php";
    }
 
    //fetch the cocktails
    fetch(url, { method: 'GET'}) //this returns a promise object
    .then(jsonRes => jsonRes.json()) //parse into usable obj
    .then(obj => {

        cocktailBox.innerHTML = ''; //empty cocktailbox each time fxn called
        console.log('stridrink', obj.drinks[0].strDrink)
        console.log('strGlass', obj.drinks[0].strGlass)

        obj.drinks.sort((a,b) => a.strDrink > b.strDrink ? 1 : -1);

        for(let drink of obj.drinks) {

            const drinkDiv = document.createElement('div');
            drinkDiv.className = 'drink-div';

            const h1 = document.createElement('h1');
            h1.textContent = drink.strDrink;
            drinkDiv.appendChild(h1);

            const drinkTextDiv = document.createElement('div');
            drinkTextDiv.className = 'drink-text-div';
            //below used to check div size for desc/ingred 
            //drinkTextDiv.style.border = '3px dashed orange';

            const instructions = document.createElement('p');
            instructions.innerText = drink.strInstructions;
            drinkTextDiv.appendChild(instructions);
            //add header text above ul list as h3
            const h3 = document.createElement('h3');
            h3.innerHTML = 'Ingredients &amp; Measures:';
            drinkTextDiv.appendChild(h3); // output h1 to drink div
            
            //make bulleted list of ingredients - measures
            const ul = document.createElement('ul');
            //loop the strIngredient properties, concatenating hte number: stringredient1, etc..
            //use the key string as dynamic key to look up value ona  loop that runs 15 times
            //if less thant 15 increated those values are all null

            for (let i=1; i  <= 15; i++) {
                //concat a drynamic key string by adding number suffix
                const ingredKey = `strIngredient${i}`;
                const measureKey =  `strMeasure${i}`;
                const li = document.createElement('li'); // make an li
                //look up value of dynamic key: drink['strIngredient1']
                li.textContent = `${drink[ingredKey]} - ${drink[measureKey]}`; 
                if(drink[ingredKey]) ul.appendChild(li); // output the li to the ul if NOT null
            }

            drinkTextDiv.appendChild(ul);
            drinkDiv.appendChild(drinkTextDiv);
        
            const pic = new Image();
            pic.src = drink.strDrinkThumb;
            drinkDiv.appendChild(pic);

            cocktailBox.appendChild(drinkDiv);

        }//end loop

    }) //do stuff with data
   
};