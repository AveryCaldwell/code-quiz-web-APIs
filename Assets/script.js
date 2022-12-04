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
      "1. quotes",
      "2. curly brackets",
      "3. parentheses",
      "4. square brackets",
    ],
    correctAnswer: "3. parentheses",
    correctAnswerIndex: 2,
  },
  4: {
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    answerArray: [
      "1. quotes",
      "2. curly brackets",
      "3. parentheses",
      "4. square brackets",
    ],
    correctAnswer: "3. parentheses",
    correctAnswerIndex: 2,
  },
  5: {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answerArray: [
      "1. quotes",
      "2. curly brackets",
      "3. parentheses",
      "4. square brackets",
    ],
    correctAnswer: "3. parentheses",
    correctAnswerIndex: 2,
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
// On click event that sets section to visible and shows quesiton 1
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
// If localStorage is not undefined, sets highscore to the JSON parse of the string stored in local storage; otherwise it sets highscore to an empty array; parse` converts the string into an object
if (localStorage.getItem("highScore") != undefined) {
  highScore = JSON.parse(localStorage.getItem("highScore"));
} else {
  highScore = [];
}

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

// This function stores the outcome of the quiz and notifies the user of their score
let quizComplete = function () {
  // The timer stops
  clearInterval(interval);
  //The final score is the count value
  setFinalScore(count);
  // Displays results page
  activeSection("results");
};

// Funtion for when the answer is clicked
let answerClick = function () {
  // If the users answer does not match the correct answer, then 10 seconds is subtracted from the timer
  if (this.answer !== this.index) {
    count -= 10;
    setTimerValue(count);
  }
  // total num of questions is higher than the current question index, then it will display the next question; otherwise the quiz is complete
  if (questionCount >= currentQuestion) {
    populateQuiz(currentQuestion);
  } else {
    quizComplete();
  }
  return;
};
// `.push` adds it to the end of the highscore array
const initialsSubmit = function () {
  highScore.push({ initials: initialsInput.value, score: count });
  // Sorts the scores using criteria from scoreCompare function
  highScore.sort(scoreCompare);
  // localstorage highscore is set to a stringified highscore JSON so we have access to the data
  localStorage.setItem("highScore", JSON.stringify(highScore));
  // The high scores page is displayed and visible and the timer is reset
  activeSection("scores");
  count = 75;
  setTimerValue(count);
};
// On click event for when the user inputs their initials on the resultsPage
initialsSubmitBtn.addEventListener("click", initialsSubmit);
// This function takes the current page and goes to the next one
function populateQuiz(quizIndex) {
  currentQuestion++;
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
// Restarts the quiz and displays the homepage because the current question value is set to 0
function restart() {
  populateQuiz(currentQuestion[0]);
}

// On click event for "View Highscore" in nav that returns the Highscores page
highScoreBtn.addEventListener("click", function () {
  activeSection("scoresPage");
});

// Creates a list of High scores from highest to lowest~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function displayHighScores() {
  scoresPage(value);
  scoresList(value);
}
// Create list items for each highscore ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
for (var i = 0; i < highScore.length; i++) {
  let newListItem = document.createElement("li");
  newListItem.textContent = highScore[i];
  scoresList.appendChild(newListItem);
}

// On click event for scoresPage that clears the highScoresList
clearBtn.addEventListener("click", function () {
  clearInterval("results");
  clearInterval("scoresList");
  console.log("results cleared");
});

/* TO DO:
  - Clear Highscores (needs to reset highScores object and clear the values from local storage)
  - Visualize highscores.
  - validate initials
  - prompt corerct answer text
  - Add comments
  - format CSS
  - clean up JS
  - clean up HTML

  Next Steps:
    Work on the visualization of the highScores array. To do this, the goal is to iterate through the array, and utilizing a list, visualize it on the score page. After that, look at othert items in the TODO list. 


*/
