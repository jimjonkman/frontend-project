const quizzes = {
    quiz1: [
        { question: "vraag1: Welke letter is correct?", answers: ["A: Optie 1", "B: Optie 2", "C: Optie 3", "D: Optie 4"], correct: "B" },
        // ...other quiz1 questions...
    ],
    quiz2: [
        { question: "Uit welk land komt Pizza?", answers: ["A: Indonesië", "B: Italië", "C: Nederland", "D: Amerika"], correct: "B" },
        // ...other quiz2 questions...
    ],
    quiz3: [
        { question: "vraag1: Welke letter is correct?", answers: ["A: Optie 1", "B: Optie 2", "C: Optie 3", "D: Optie 4"], correct: "B" },
        // ...other quiz3 questions...
    ]
};

// Detect quiz type from URL
let quizType = "quiz1";
if (window.location.pathname.includes("quiz2")) quizType = "quiz2";
if (window.location.pathname.includes("quiz3")) quizType = "quiz3";

const quizData = quizzes[quizType];
let currentQuestion = 0;
let score = 0;

const questionElement = document.querySelector(".subtitle_question");
const answerButtons = document.querySelectorAll(".answer-button");

function showQuestion() {
    const q = quizData[currentQuestion];
    questionElement.textContent = q.question;
    answerButtons.forEach((btn, index) => {
        btn.textContent = q.answers[index];
        btn.style.display = "flex";
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

if (quizData) showQuestion();