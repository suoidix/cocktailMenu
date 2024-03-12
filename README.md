# JavaScript Project
To preview file download as zip. 

## thecocktaildb.com API
### No API key is required for non-commercial use
### here are 3 ways to get cocktails: 
ALL 3 ways call the same function: **getCocktail**
- **search input**: requests drinks whose names include the search keyword
- **select menu**: requests drinks whose names include the selected option
- **random button**: click to request a random cocktail (returns 1 result)
- **letter buttons**: click to get cocktails that start with that letter
Results are limited for free API to 25 results  
(premium / paid plan has more results)  

**API endpoints used**
- Search box and select menu request cocktails by **name** from **endpoint**:  
**www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita**  
- Random button requests a random cocktail from **endpoint**:  
**www.thecocktaildb.com/api/json/v1/1/random.php**  
- Letter button requests all cocktails starting with that letter from **endpoint**:  
**www.thecocktaildb.com/api/json/v1/1/search.php?f=a**  

- **Cocktail-API.js** file uses **fetch()** to make the request

**API returns an object w ONE key: "drinks"**
the drinks array values are all objects, one per drink
each obj has lots of keys; the ones we want are:  
- **strDrink** (name of drink)  
- **strInstructions** (describes how to make the cocktail)  
- **strDrinkThumb** (absolute url of drink image on the remote API server)  
- **strIngredient1** - **strIngredient15**  
  (each property is one ingredient string instead of having all ingredients in an array); 
- if less than 15 ingredients, those values are all null  
- **strMeasure1** - **strMeasure15** works same as ingredient props 