const questions = [
  {
    question: "Hvilken farve er pænest?",
    answers: [
      { text: "Sennep", correct: false },
      { text: "Grøn", correct: true },
      { text: "Lavendel", correct: false },
      { text: "Alle farver", correct: false },
    ],
  },
  {
    question: "Hvad er det bedste ved kodning?",
    answers: [
      { text: "Design", correct: false },
      { text: "Styling", correct: false },
      { text: "Når det virker", correct: true },
      { text: "Javascript", correct: false },
    ],
  },
  {
    question: "Hvor er den perfekte siddeplads i lokale A333?",
    answers: [
      { text: "Bagerst, inderst", correct: true },
      { text: "Forrest, yderst", correct: false },
      { text: "I midten, venstre side (specifikt gruppe 6)", correct: false },
      { text: "Jeg hader alle pladser", correct: false },
    ],
  },
  {
    question: "Hvad bør man have med i skole?",
    answers: [
      { text: "Bare computer og oplader", correct: false },
      { text: "Computer og madpakke", correct: false },
      { text: "Computer, drikkedunk, 2x penalhuse, notesbøger...", correct: true },
      { text: "Rottefælder og stinkost", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Næste";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `Du scorede ${score} ud af ${questions.length}!`;
  nextButton.innerHTML = "Prøv igen";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
