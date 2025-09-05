const quizData = [
    {
        question: "Uit welk land komt Pizza?",
        answers: ["A: Indonesië", "B: Italië", "C: Nederland", "D: Amerika"],
        correct: "B"
    },
    {
        question: "Welk gerecht wordt traditioneel gegeten tijdens Thanksgiving in de Verenigde Staten?",
        answers: ["A: Kalkoen", "B: Ham", "C: Beef Wellington", "D: Lasagne"],
        correct: "A"
    },
    {
        question: "Wat is een traditioneel Japans gerecht dat bestaat uit rauwe vis en rijst?",
        answers: ["A: Sashimi", "B: Ramen", "C: Tempura", "D: Sushi"],
        correct: "D"
    },
    {
        question: "Wat is een populair Mexicaans gerecht dat bestaat uit een tortilla gevuld met vlees, bonen en kaas?",
        answers: ["A: Tacos", "B: Burritos", "C: Enchiladas", "D: Quesadillas"],
        correct: "B"
    },
    {
        question: "Wat is een populair Italiaans gerecht dat bestaat uit een dunne, ronde bodem belegd met tomaat, kaas en diverse ingrediënten?",
        answers: ["A: Risotto", "B: Pasta", "C: Pizza", "D: Lasagne"],
        correct: "C"
    }
];

let currentQuestion = 0;
let score = 0;

// Selecteer de vraagtekst en ALLE antwoordknoppen
const questionElement = document.querySelector(".subtitle_question");
const answerButtons = document.querySelectorAll(".answer-button");


function showQuestion() {
    const q = quizData[currentQuestion];
    questionElement.textContent = q.question;
    answerButtons.forEach((btn, index) => {
        btn.textContent = q.answers[index];
    });
}

answerButtons.forEach(button => {
    button.addEventListener("click", () => {
        const chosen = button.textContent.charAt(0);
        
        if (chosen === quizData[currentQuestion].correct) {
            score++;
            alert("Correct!");
        } else {
            alert("Incorrect! Het juiste antwoord was: " + quizData[currentQuestion].correct);
        }

        currentQuestion++;

        if (currentQuestion < quizData.length) {
            showQuestion();
        } else {
            questionElement.textContent = `Quiz voltooid! Je score is ${score} uit ${quizData.length}.`;
            answerButtons.forEach(btn => btn.style.display = 'none');
        }
    });
});

showQuestion();
