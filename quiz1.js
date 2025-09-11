const quizData = [
    {
        question: "vraag1: Welke letter is correct?",
        answers: ["A: Optie 1", "B: Optie 2", "C: Optie 3", "D: Optie 4"],
        correct: "B"
    },
    {
        question: "vraag2: Welke letter is correct?",
        answers: ["A: Optie 1", "B: Optie 2", "C: Optie 3", "D: Optie 4"],
        correct: "D"
    },
    {
        question: "vraag3: Welke letter is correct?",
        answers: ["A: Optie 1", "B: Optie 2", "C: Optie 3", "D: Optie 4"],
        correct: "A"
    },
    {
        question: "vraag4: Welke letter is correct?",
        answers: ["A: Optie 1", "B: Optie 2", "C: Optie 3", "D: Optie 4"],
        correct: "B"
    },
    {
        question: "vraag5: Welke letter is correct?",
        answers: ["A: Optie 1", "B: Optie 2", "C: Optie 3", "D: Optie 4"],
        correct: "C"
    }
];

let currentQuestion = 0;
let score = 0;


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
