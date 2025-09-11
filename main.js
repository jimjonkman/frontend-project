const quizzes = {
// Sport vragen
quiz1: [
    { question: "Welke sport wordt gespeeld op Wimbledon?", answers: ["A: Voetbal", "B: Tennis", "C: Hockey", "D: Basketbal"], correct: "B" },
    { question: "Hoeveel spelers staan er in een voetbalelftal?", answers: ["A: 9", "B: 10", "C: 11", "D: 12"], correct: "C" },
    { question: "Welke kleur heeft de gele trui bij de Tour de France?", answers: ["A: Rood", "B: Geel", "C: Groen", "D: Wit"], correct: "B" }
],

// ICT vragen
quiz2: [
    { question: "Wat betekent de afkorting 'CPU'?", answers: ["A: Computer Power Unit", "B: Central Processing Unit", "C: Control Program Utility", "D: Computer Program Unit"], correct: "B" },
    { question: "Welke programmeertaal wordt vaak gebruikt voor webpagina's?", answers: ["A: Java", "B: Python", "C: JavaScript", "D: C++"], correct: "C" },
    { question: "Wat is een voorbeeld van een besturingssysteem?", answers: ["A: Windows", "B: Excel", "C: Photoshop", "D: Chrome"], correct: "A" }
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
let timeLeft = 60;
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
    timeLeft = 60;
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
