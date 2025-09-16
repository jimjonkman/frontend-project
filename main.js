// ====================== QUIZ DATA ======================
const quizzes = {
    quiz1: [
        { question: "Welke sport wordt gespeeld op Wimbledon?", answers: ["A: Voetbal", "B: Tennis", "C: Hockey", "D: Basketbal"], correct: "B" },
        { question: "Hoeveel spelers staan er in een voetbalelftal?", answers: ["A: 9", "B: 10", "C: 11", "D: 12"], correct: "C" },
        { question: "Welke kleur heeft de gele trui bij de Tour de France?", answers: ["A: Rood", "B: Geel", "C: Groen", "D: Wit"], correct: "B" }
    ],
    quiz2: [
        { question: "Welke programmeertaal wordt vaak gebruikt voor websites?", answers: ["A: Python", "B: JavaScript", "C: C#", "D: Java"], correct: "B" },
        { question: "Wat betekent HTML?", answers: ["A: HyperText Markup Language", "B: High Tech Machine Learning", "C: Home Tool Markup Language", "D: Hyperlink Text Management Language"], correct: "A" },
        { question: "Welke tag gebruik je in HTML om een link te maken?", answers: ["A: <img>", "B: <a>", "C: <link>", "D: <href>"], correct: "B" }
    ],
    quiz3: [
        { question: "Uit welk land komt Sushi oorspronkelijk?", answers: ["A: China", "B: Japan", "C: Thailand", "D: Korea"], correct: "B" },
        { question: "Wat is het hoofdingrediënt van hummus?", answers: ["A: Tomaat", "B: Aardappel", "C: Kikkererwten", "D: Rijst"], correct: "C" },
        { question: "Welke kaas is typisch Nederlands?", answers: ["A: Brie", "B: Gouda", "C: Feta", "D: Cheddar"], correct: "B" }
    ]
};

// ====================== QUIZ SELECTIE ======================
let quizType = "quiz1";
if (window.location.pathname.includes("quiz2")) quizType = "quiz2";
if (window.location.pathname.includes("quiz3")) quizType = "quiz3";

const quizData = quizzes[quizType];
let currentQuestion = 0;
let score = 0;

// ====================== DOM ELEMENTEN ======================
const questionElement = document.querySelector(".subtitle_question");
const answerButtons = document.querySelectorAll(".answer-button");
const timeDisplay = document.getElementById('timeDisplay');
const progressCircle = document.querySelector('.progress');

const radius = 50;
const circumference = 2 * Math.PI * radius;
progressCircle.style.strokeDasharray = circumference;

let timeLeft = 30;
let timerInterval;

// ====================== TIMER FUNCTIES ======================
function startTimer() {
    timeLeft = 30;
    clearInterval(timerInterval);
    updateTimerUI();

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerUI();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            answerButtons.forEach(btn => btn.disabled = true);
            timeDisplay.textContent = "⏰";
            setTimeout(nextQuestion, 1500);
        }
    }, 1000);
}

function updateTimerUI() {
    timeDisplay.textContent = timeLeft;
    const percent = timeLeft / 30;
    progressCircle.style.strokeDashoffset = circumference * (1 - percent);

    if (percent > 0.5) progressCircle.style.stroke = "#22c55e"; // groen
    else if (percent > 0.2) progressCircle.style.stroke = "#eab308"; // geel
    else progressCircle.style.stroke = "#ef4444"; // rood
}

// ====================== VRAAG WEERGAVE ======================
function showQuestion() {
    const q = quizData[currentQuestion];
    questionElement.textContent = q.question;
    answerButtons.forEach((btn, index) => {
        btn.textContent = q.answers[index];
        btn.disabled = false;
        btn.style.display = "block";
    });

    startTimer(); // automatisch starten bij elke vraag
}

// ====================== VOLGENDE VRAAG ======================
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        questionElement.textContent = `Quiz voltooid! Je score is ${score} uit ${quizData.length}.`;
        answerButtons.forEach(btn => btn.style.display = 'none');
        timeDisplay.textContent = "";
        progressCircle.style.strokeDashoffset = 0;
    }
}

// ====================== ANTWOORD EVENTS ======================
answerButtons.forEach(button => {
    button.addEventListener("click", () => {
        clearInterval(timerInterval);
        const chosen = button.textContent.charAt(0);
        if (chosen === quizData[currentQuestion].correct) score++;
        nextQuestion();
    });
});

// ====================== START QUIZ ======================
if (quizData.length > 0 && questionElement) {
    showQuestion();
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
