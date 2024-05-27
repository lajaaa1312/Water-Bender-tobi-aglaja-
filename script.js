const charactersUrl = "https://last-airbender-api.fly.dev/api/v1/characters";



console.log(fetchData(charactersUrl));

//Variablen für die Scores der Elemente

let scoreFire = 0;
let scoreWater = 0;
let scoreEarth = 0;
let scoreAir = 0;
let questionCounter = 0;

const quizzContainer = document.querySelector("#quizz");
const landingPage = document.getElementById('landing-page');
const quizContainer = document.getElementById('quiz-container');
const startButton = document.getElementById('start-button');

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
    let n = (element === 'air' || element === 'earth') ? 'n' : '';

    let resultElement = document.createElement('div');
    resultElement.innerHTML = `<h1>You're a${n} ${element}bender</h1>`;

    let bendersList = '<h2>Your fellow benders:</h2><div class="benders-list">';
    data.forEach(bender => {
        bendersList += `
            <div class="bender">
                <img src="${bender.photoUrl}" alt="${bender.name}">
                <p> ${bender.name}</p>
            
            </div>
        `;
    });
    bendersList += '</div>';
    
    resultElement.innerHTML += bendersList;
    quizz.appendChild(resultElement);
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


