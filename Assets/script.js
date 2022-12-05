// Question and answer object
let questionObj = {
  1: {
    question: "Commonly used data types DO NOT include:",
    answerArray: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    correctAnswer: "3. alerts",
    correctAnswerIndex: 2,
  },
  2: {
    question: "The condition in an if/else statement is inclosed within ____.",
    answerArray: [
      "1. quotes",
      "2. curly brackets",
      "3. parentheses",
      "4. square brackets",
    ],
    correctAnswer: "3. parentheses",
    correctAnswerIndex: 2,
  },
  3: {
    question: "Arrays in JavaSCript can be used to store ____.",
    answerArray: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    correctAnswer: "4. all of the above",
    correctAnswerIndex: 3,
  },
  4: {
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    answerArray: [
      "1. commas",
      "2. curly brackets",
      "3. quotes",
      "4. parentheses",
    ],
    correctAnswer: "3. quotes",
    correctAnswerIndex: 2,
  },
  5: {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answerArray: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops ",
      "4. console log",
    ],
    correctAnswer: "4. console log",
    correctAnswerIndex: 3,
  },
};

let count = 75; // in seconds
let interval;
// The timerStart function begins the timer and decreases in time.
let timerStart = function () {
  interval = setInterval(function () {
    count--;
    // If the time is less than zero, then the timer is set to zero to avoid negative numbers
    if (count < 0) {
      count = 0;
    }
    // If the value of the timer reaches 0; then the quiz ends and displays resultsPage
    setTimerValue(count);
    if (count === 0) {
      quizComplete();
    }
  }, 1000);
};
// The setTimerValue function sets the innerHTML to the timer value
const setTimerValue = function (value) {
  timer.innerHTML = value;
};
// The setFinalScore function sets the innerHTML to the score value
const setFinalScore = function (value) {
  finalScore.innerHTML = value;
};
const timer = document.getElementById("count");
const quiz = document.getElementById("quiz");
const homepage = document.getElementById("homepage");
const results = document.getElementById("resultsPage");
const scores = document.getElementById("scoresPage");
const finalScore = document.getElementById("finalScore");
const initialsInput = document.getElementById("initialsInput");
const initialsSubmitBtn = document.getElementById("initialsSubmit");
const quizStart = document.getElementById("startBtn");
const highScoreBtn = document.getElementById("highScoreBtn");
const scoresPage = document.getElementById("scoresPage");
const clearBtn = document.getElementById("clearBtn");
const scoresList = document.getElementById("scoresList");
const answerResult = document.getElementById("result");
initialsInput.addEventListener("keypress", function (event) {
  event.preventDefault();
  if (/[a-z]/i.test(event.key) && initialsInput.value.length < 4) {
    initialsInput.value += event.key.toUpperCase();
  }
});
// A max of 4 letters can be submitted and a minimum of two have to be submitted
initialsInput.maxLength = 4;
initialsInput.minLength = 2;
// Hides sections until active
const hideSections = function () {
  homepage.style.display = "none";
  quiz.style.display = "none";
  results.style.display = "none";
  scores.style.display = "none";
};
// Hides inactive sections and only shows current page
function activeSection(section) {
  hideSections();
  if (section === "homepage") {
    homepage.style.display = "block";
  } else if (section === "quiz") {
    timerStart();
    quiz.style.display = "block";
  } else if (section === "results") {
    results.style.display = "block";
  } else if (section === "scores") {
    scores.style.display = "block";
  } else if (section === "scoresPage") {
    scoresPage.style.display = "block";
  }
}
// On click event that sets section to visible and shows question 1
quizStart.addEventListener("click", function () {
  currentQuestion = 1;
  activeSection("quiz");
});

// Tells the total number of questions
let questionCount = 5;
// Tells which question we are currently on
let currentQuestion = 1;

// Highscore array
let highScore;
// If localStorage is not undefined, sets highscore to the JSON parse of the string stored in local storage
if (localStorage.getItem("highScore") != undefined) {
  highScore = JSON.parse(localStorage.getItem("highScore"));
  //  Otherwise it sets highscore to an empty array; parse` converts the string into an object
} else {
  highScore = [];
}

// This function creates a new list item in the highscoreArray and displays the scores/initials on the scoresPage
const populateHighScoreList = function () {
  scoresList.innerHTML = "";
  for (var i = 0; i < highScore.length; i++) {
    let newListItem = document.createElement("li");
    newListItem.textContent = highScore[i].initials + ":" + highScore[i].score;
    scoresList.appendChild(newListItem);
  }
};
// Subfunction compares objects from array and compares the values
function scoreCompare(a, b) {
  if (a.score > b.score) {
    return -1;
  }
  if (a.score < b.score) {
    return 1;
  }
  return 0;
}

let quizComplete = function () {
  // The timer stops
  clearInterval(interval);
  //The final score is the count value
  setFinalScore(count);
  // Displays results page
  activeSection("results");
};

// Function shows "incorrect/correct" text for 2 seconds after answer is chosen
const answerResultFlash = function () {
  answerResult.style.display = "block";
  setTimeout(function () {
    answerResult.style.display = "none";
  }, 2000);
};
// When an answer is clicked, then the next question is displayed
let answerClick = function () {
  currentQuestion++;
  // If the users answer does not match the correct answer, then 10 seconds is subtracted from the timer
  if (this.answer !== this.index) {
    count -= 10;
    if (count < 1) {
      count = 0;
    }
    setTimerValue(count);
    answerResult.innerHTML = "Incorrect";
  } else {
    answerResult.innerHTML = "Correct";
  }
  answerResultFlash();
  // if total num of questions is higher than the current question index, then it will display the next question; otherwise the quiz is complete
  if (questionCount >= currentQuestion) {
    populateQuiz(currentQuestion);
  } else {
    quizComplete();
  }
  return;
};
// `.push` adds it to the end of the highscore array; alert promptt displays input criteria
const initialsSubmit = function () {
  if (initialsInput.value.length > 4 || initialsInput.value.length < 2) {
    alert("Please enter your initials. (2-4 Characters, Alpha Characters Only");
    return;
  }

  highScore.push({ initials: initialsInput.value, score: count });
  // `.push` adds new scores/initials to the end of the highScore array
  highScore.sort(scoreCompare);
  // localstorage highscore is set to a stringified highscore JSON so we have access to the data
  localStorage.setItem("highScore", JSON.stringify(highScore));
  populateHighScoreList();

  // The high scores page is displayed and visible and the timer is reset
  activeSection("scores");
  count = 75;
  setTimerValue(count);
};
// On click event for when the user inputs their initials on the resultsPage
initialsSubmitBtn.addEventListener("click", initialsSubmit);
// This function takes the current page and goes to the next one
function populateQuiz(quizIndex) {
  document.getElementById("quizQuestion").innerHTML =
    questionObj[quizIndex]["question"];
  let button;
  for (let i = 0; i < 4; i++) {
    button = document.getElementById("answerBtn" + i);
    button.innerHTML = questionObj[quizIndex]["answerArray"][i];
    // The correct answers position in the answerArray
    button.answer = questionObj[quizIndex]["correctAnswerIndex"];
    // The index of the answer of the button the user clicked
    button.index = i;
    if (currentQuestion > 1) {
      button.removeEventListener("click", answerClick);
    }
    button.addEventListener("click", answerClick);
  }
}
// On click event for when the user completes the quiz and returns to the homepage
document.getElementById("backBtn").addEventListener("click", function () {
  activeSection("homepage");
});
populateQuiz(currentQuestion);
populateHighScoreList();
// Restarts the quiz and displays the homepage because the current question value is set to 0
function restart() {
  populateQuiz(currentQuestion[0]);
}

// On click event for "View Highscore" in nav that returns the Highscores page
highScoreBtn.addEventListener("click", function () {
  activeSection("scoresPage");
});

// This function holds the  Initials input and score values
function displayHighScores() {
  scoresPage(value);
  scoresList(value);
}

// On click event for scoresPage that clears the highScoresList
clearBtn.addEventListener("click", function () {
  scoresList.innerHTML = "";
  localStorage.removeItem("highScore");
  highScore = [];
});

/* TO DO:
  - prompt corerct answer text
  - format CSS
  - clean up JS
  - clean up HTML

*/
