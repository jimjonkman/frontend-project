const quizzes = {
// Sport vragen
quiz1: [
    { question: "Welke sport wordt gespeeld op Wimbledon?", answers: ["A: Voetbal", "B: Tennis", "C: Hockey", "D: Basketbal"], correct: "B" },
    { question: "Hoeveel spelers staan er in een voetbalelftal?", answers: ["A: 9", "B: 10", "C: 11", "D: 12"], correct: "C" },
    { question: "Welke kleur heeft de gele trui bij de Tour de France?", answers: ["A: Rood", "B: Geel", "C: Groen", "D: Wit"], correct: "B" }
],

// ICT vragen
quiz2: [
    { question: "Welke programmeertaal wordt vaak gebruikt voor het bouwen van websites?", answers: ["A: Python", "B: JavaScript", "C: C#", "D: Java"], correct: "B" },
    { question: "Wat betekent HTML?", answers: ["A: HyperText Markup Language", "B: High Tech Machine Learning", "C: Home Tool Markup Language", "D: Hyperlink Text Management Language"], correct: "A" },
    { question: "Welke tag gebruik je in HTML om een link te maken?", answers: ["A: <img>", "B: <a>", "C: <link>", "D: <href>"], correct: "B" }
],

// Eten vragen
quiz3: [
    { question: "Uit welk land komt Sushi oorspronkelijk?", answers: ["A: China", "B: Japan", "C: Thailand", "D: Korea"], correct: "B" },
    { question: "Wat is het hoofdingrediënt van hummus?", answers: ["A: Tomaat", "B: Aardappel", "C: Kikkererwten", "D: Rijst"], correct: "C" },
    { question: "Welke kaas is typisch Nederlands?", answers: ["A: Brie", "B: Gouda", "C: Feta", "D: Cheddar"], correct: "B" }
]
};

// Detecteer quiz type uit URL
let quizType = "quiz1";
if (window.location.pathname.includes("quiz2")) quizType = "quiz2";
if (window.location.pathname.includes("quiz3")) quizType = "quiz3";

const quizData = quizzes[quizType];
let currentQuestion = 0;
let score = 0;

const questionElement = document.querySelector(".subtitle_question");
const answerButtons = document.querySelectorAll(".answer-button");

// Timer variabelen
let timerInterval;
let timeLeft = 30;
let timerDiv;

// Timer alleen tonen op quiz pagina's
if (quizData && questionElement) {
    timerDiv = document.createElement('div');
    timerDiv.style.fontSize = "1.5em";
    timerDiv.style.textAlign = "center";
    timerDiv.style.margin = "20px";
    document.body.insertBefore(timerDiv, document.body.firstChild);
}

function startTimer() {
    timeLeft = 30;
    timerDiv.textContent = `Tijd over: ${timeLeft} seconden`;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
            timerDiv.textContent = `Tijd over: ${timeLeft} seconden`;
        } else {
            timerDiv.textContent = "Tijd is om!";
            clearInterval(timerInterval);
            answerButtons.forEach(btn => btn.disabled = true);
            setTimeout(nextQuestion, 1500); // 1.5s pauze voor volgende vraag
        }
    }, 1000);
}

function showQuestion() {
    const q = quizData[currentQuestion];
    questionElement.textContent = q.question;
    answerButtons.forEach((btn, index) => {
        btn.textContent = q.answers[index];
        btn.style.display = "flex";
        btn.disabled = false;
    });
    startTimer();
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        questionElement.textContent = `Quiz voltooid! Je score is ${score} uit ${quizData.length}.`;
        answerButtons.forEach(btn => btn.style.display = 'none');
        if (timerDiv) timerDiv.textContent = "";
    }
}

    function saveName() {
    const name = document.getElementById('NameInput').value.trim();
    localStorage.setItem('quizName', name);
    location.href = 'thema.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const playerNameElement = document.getElementById('playerName');
    if (playerNameElement) {
        const name = localStorage.getItem('quizName') || '';
        playerNameElement.textContent = name;
    }
});

if (quizData && questionElement) {
    showQuestion();
    answerButtons.forEach(button => {
        button.addEventListener("click", () => {
            clearInterval(timerInterval);
            const chosen = button.textContent.charAt(0);
            if (chosen === quizData[currentQuestion].correct) {
                score++;
                alert("Correct!");
            } else {
                alert("Incorrect! Het juiste antwoord was: " + quizData[currentQuestion].correct);
            }
            nextQuestion();
        });
    });
}   
