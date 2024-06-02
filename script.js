const charactersUrl = "https://last-airbender-api.fly.dev/api/v1/characters";



console.log(fetchData(charactersUrl));

//Variablen für die Scores der Elemente

let scoreFire = 0;
let scoreWater = 0;
let scoreEarth = 0;
let scoreAir = 0;
let questionCounter = 0;

const landingPage = document.getElementById('landing-page');
const quizContainer = document.getElementById('quiz-container');
const startButton = document.getElementById('start-button');


// Function to randomize the start button color
function randomizeButtonColor() {
    const colors = ['#edc60f', '#d90404', '#1c8922', '#0014e0'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const startButton = document.getElementById('start-button');
    startButton.style.backgroundColor = randomColor;

    // Select h2 after it has been added to the DOM
    const textColor = document.querySelector('#start-button');

    // Set color of h2 based on randomColor
    if (randomColor === '#0014e0' || randomColor === '#d90404') {
        textColor.style.color = 'white';
    } else {
        textColor.style.color = ''; // Reset color to default if not #0014e0 or #d90404
    }
}

// Call the function to randomize the button color on page load
document.addEventListener('DOMContentLoaded', () => {
    randomizeButtonColor();
});



// Function to randomize the start button color
function randomizeTeamButtonColor() {
    const colors = ['#edc60f', '#d90404', '#1c8922', '#0014e0'];
    const randomTeamColor = colors[Math.floor(Math.random() * colors.length)];
    const teamButton = document.getElementById('team-button');
    teamButton.style.backgroundColor = randomTeamColor;

}

// Call the function to randomize the button color on page load
document.addEventListener('DOMContentLoaded', () => {
    randomizeTeamButtonColor();
});



startButton.addEventListener('click', () => {
    landingPage.style.display = 'none';
    quizContainer.style.display = 'block';
    document.body.style.background = 'rgba(255, 255, 255, 0.8)'; // Hintergrund ändern
});

const quizz = document.querySelector("#quizz");


let questions = [
    {
        questionText: "What is your preferred time of day?",
        answerText: ["Dusk", "Night", "Dawn", "Noon"],
        answerElement: ["earth", "water", "air", "fire"]
    },
    {
        questionText: "What is your life philosophy?",
        answerText: [
            "Finding strength through calmness and steadfastness",
            "Achieving harmony through adaptation and flow",
            "Experiencing freedom through lightness and letting go",
            "Attaining power through passion and determination"
        ],
        answerElement: ["earth", "water", "air", "fire"]
    },
    {
        questionText: "Which animal appeals to you the most?",
        answerText: ["Mole", "Whale", "Eagle", "Dragon"],
        answerElement: ["earth", "water", "air", "fire"]
    },
    {
        questionText: "How would you behave in a conflict?",
        answerText: [
            "Attempt to mediate and find a compromise",
            "I seek a diplomatic solution",
            "I withdraw and try to calm the situation",
            "I fight for my convictions and defend myself"
        ],
        answerElement: ["earth", "water", "air", "fire"]
    },
    {
        questionText: "What is your greatest strength?",
        answerText: ["Fortitude", "Adaptability", "Peacefulness", "Passion"],
        answerElement: ["earth", "water", "air", "fire"]
    },
    {
        questionText: "How do you react in stressful situations?",
        answerText: [
            "I make a plan to handle the situation",
            "I try to adapt to the circumstances",
            "I take my time and stay calm",
            "I take quick action"
        ],
        answerElement: ["earth", "water", "air", "fire"]
    }
];

// Shuffle questions
function shuffleQuestions(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Shuffle the questions array
shuffleQuestions(questions);

function createItem(question) {
    let item = document.createElement('div');
    item.classList.add('question');
    item.innerHTML = `
        <h2>${question.questionText}</h2>
        <div class="answer">
            <button>${question.answerText[0]}</button>
            <button>${question.answerText[1]}</button>
            <button>${question.answerText[2]}</button>
            <button>${question.answerText[3]}</button>
        </div>
    `;
    quizz.appendChild(item);

    const buttons = item.querySelectorAll('.answer button');
    buttons.forEach((button, index) => {
        button.addEventListener('click', function () {
            item.remove(); // Remove the current question

            const answerElement = question.answerElement[index];

            if (answerElement === 'fire') {
                scoreFire++;
            } else if (answerElement === 'water') {
                scoreWater++;
            } else if (answerElement === 'earth') {
                scoreEarth++;
            } else if (answerElement === 'air') {
                scoreAir++;
            }

            questionCounter++;
            if (questionCounter >= questions.length) {
                getFinalElement();
            } else {
                createItem(questions[questionCounter]);
            }
        });
    });
}

function getFinalElement() {
    const maxScore = Math.max(scoreFire, scoreWater, scoreEarth, scoreAir);
    let element = '';
    if (maxScore === scoreFire) {
        element = 'fire';
    } else if (maxScore === scoreWater) {
        element = 'water';
    } else if (maxScore === scoreEarth) {
        element = 'earth';
    } else if (maxScore === scoreAir) {
        element = 'air';
    }

    fetch(`https://last-airbender-api.fly.dev/api/v1/characters?affiliation=${element}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayResults(element, data);
        })
        .catch(error => console.error('Error fetching element:', error));
}


function displayResults(element, data) {
    // Filter out characters that don't have a photoUrl
    let filteredData = data.filter(bender => bender.photoUrl);

    //add n to air and earth for grammar
    let n = (element === 'air' || element === 'earth') ? 'n' : '';

    let resultElement = document.createElement('div');
    resultElement.classList.add('results');
    resultElement.innerHTML = `<h1>You're a${n} ${element}bender</h1>`;

    let bendersList = '<h2>Your fellow benders:</h2><div class="benders-list">';
    filteredData.forEach(bender => {
        bendersList += `
            <div class="bender">
                <img src="${bender.photoUrl}" alt="${bender.name}">
                <p>${bender.name}</p>
            </div>
        `;
    });
    bendersList += '</div>';

    resultElement.innerHTML += bendersList;
    quizz.appendChild(resultElement);

    // Set background color based on element
    let bgColor = '';
    switch (element) {
        case 'air':
            bgColor = '#edc60f';
            break;
        case 'fire':
            bgColor = '#d90404';
            break;
        case 'earth':
            bgColor = '#1c8922';
            break;
        case 'water':
            bgColor = '#0014e0';
            break;
    }
    resultElement.style.backgroundColor = bgColor;

    const teamButtonColor = document.getElementById('team-button');
    teamButtonColor.style.backgroundColor = bgColor;


    // Select h1 and h2 after they have been added to the DOM
    const title = resultElement.querySelector('h1');
    const subtitle = resultElement.querySelector('h2');

    // Set color of h1 and h2 based on bgColor
    if (bgColor === '#0014e0' || bgColor === '#d90404') {
        title.style.color = 'white';
        subtitle.style.color = 'white';
    }

    console.log('You are a', element, 'bender');

      // Replace the other images with the image corresponding to the element
      const images = document.querySelectorAll('.corner-image');
      images.forEach(image => {
            image.src = `assets/WEBASSETS/${element} symbol square.png`; // replace with the correct image path
          
      });

    
}


// Start the quiz with the first question
createItem(questions[0]);

async function fetchData(charactersUrl) {
    try {
        let response = await fetch(charactersUrl);
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
