console.log('Hello, world!');

const charactersUrl = "https://last-airbender-api.fly.dev/api/v1/characters";


console.log(fetchData(charactersUrl));

//Variablen für die Scores der Elemente

let scoreFire = 0;
let scoreWater = 0;
let scoreEarth = 0;
let scoreAir = 0;

const quizz = document.querySelector("#quizz");

let questions = [
    {
        questionText: "What is your preferred time of day?",
        answerText: ["Noon","Night","Dusk","Dawn"],
        answerElement: ["fire","water","earth","air"]
     }
];



function createItem(questionList) {
    let item = document.createElement('div');
    item.classList.add('question');
    item.innerHTML = `
    <h2>${questionList[0].questionText}</h2>

    <div class="answer">
    <button>${questionList[0].answerText[0]}</button>
    <button>${questionList[0].answerText[1]}</button>
    <button>${questionList[0].answerText[2]}</button>
    <button>${questionList[0].answerText[3]}</button>
    </div>
    
    `;
    quizz.appendChild(item);
}



console.log(questions[0].questionText);

createItem(questions);


// function createItem(cocktail) {                                      //wir jedes drinks element im cocktails array 
//     let item = document.createElement('div');                               //wir bereiten einen container vor in dem die daten dann angezeigt werden können im DOM/HTML (noch nicht geschrieben, nur vorbereitet) anders: wir erstellen ein neues div
//     item.classList.add('drink');                                             //wir geben dem container eine klasse, damit wir ihn später stylen können
//     item.innerHTML = `
//     <h2>${cocktail.strDrink}</h2>
//     <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}" 
//     <p>${cocktail.strInstructions}</p>
//     `;                                                                      //wir schreiben die informationen des drinks in den container
//     cocktailApp.appendChild(item);  
// }







async function fetchData(charactersUrl) {
    try {
        let response = await fetch(charactersUrl);
        let data = await response.json();
        return data;                                                        //gefetchte daten aus der Funktion ausgeben, damit man sie weiter verwenden kann
    }
    catch (error) {
        console.log(error);
    }
}