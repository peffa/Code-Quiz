
    // Variables
var startBtn = document.getElementById("startBtn");
var submitBtn = document.querySelector("button.submitBtn")
var secondsLeft = (questions.length * 15 + 1);
var timerEl = document.getElementById("timer");
var submitScoreEl = document.querySelector("#submit-score");
var userScoreEl = document.getElementById("user-score");
var userNameInput;
var questionHead = document.getElementById("questions");
var answerChoices = document.getElementById("answers");

var questionNumber = -1;
var answer;

    /* Starting the game */
function startTimer() {
    // replace start screen with questions
    document.getElementById("home").classList.add('d-none');
    document.getElementById("quiz").classList.remove('d-none');

    // A timer starts and is displayed on the page.
    setTimer();
    // Display questions
    makeQuestions();
}

    /* Logic of the quiz */
    // Need something keeping track of score
    // set a variable that has the number of milliseconds
    // Will need to setup a setinterval function
    // if variable reaches 0, clear the timer, example is in 4.08
    // Make sure it works for like 10 seconds and doesn't go below 0, ex no negatives
    // clear the timer when it hits 0
    // clear the middle section and display first question
function setTimer() {

    var countdown = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;

        if (secondsLeft === 0 || questionNumber === questions.length) {
            clearInterval(countdown);
            setTimeout(displayScore, 500);
        }
    }, 1000);
}

function makeQuestions() {
    questionNumber++;
    answer = questions[questionNumber].answer

    questionHead.textContent = questions[questionNumber].title;
    answerChoices.innerHTML = "";

    var choices = questions[questionNumber].choices;

    for (var q = 0; q < choices.length; q++) {
        var nextChoice = document.createElement("button");

        nextChoice.textContent = choices[q]
        answerBtn = answerChoices.appendChild(nextChoice).setAttribute("class", "p-3 m-1 btn btn-light btn-block");
    }
}

    // initial submission
function displayScore() {
    document.getElementById("quiz").classList.add('d-none');
    document.getElementById("submit-score").classList.remove('d-none');
    userScoreEl.textContent = "Your final score is " + secondsLeft + ".";
}

    // event listener on the button to start the game
startBtn.addEventListener("click", startTimer);
submitBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    addScore();
    
    window.location.href = './highscores.html'
});

function addScore () {
    userNameInput = document.getElementById("userName").value
    
    // name & score keys
var newScore = {
        name: userNameInput,
        score: secondsLeft
    };
    // if scores are in local storage get & if not create
    var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    // push into score array
    highScores.push(newScore)
    // conversion of objects into an array of strings
    localStorage.setItem("highScores", JSON.stringify(highScores));

}

function hideFeedback(){
    var pEl= document.getElementsByClassName("feedback")[0]
    pEl.style.display='none'
}

function showFeedback(){
    var pEl= document.getElementsByClassName("feedback")[0]
    pEl.removeAttribute('style');
}

answerChoices.addEventListener("click", function (event) {
    var pEl= document.getElementsByClassName("feedback")[0]
    
    // answer result
    if (answer === event.target.textContent) {   
        pEl.innerHTML = "Correct!";
        setTimeout(hideFeedback,1000);
        showFeedback();   
    } else {
        pEl.innerHTML = "Wrong!";
        setTimeout(hideFeedback,1000);
        secondsLeft = secondsLeft - 10;
        showFeedback();
    }    
    makeQuestions();

});

    /* Putting a question on the page */
    // Counter variable starting at 0.
    // Take the first question from the array, this will be an object
    // Grab the title of the question and put it on the page with javascript
    // Grab the answers of the question
        // Loop through the answers
        // Put the answers in individual buttons
        // Have some data on the buttons indicating the value inside (hint data-answer)
        // event listener to click those answers
            // when you click the answer, you grab the value of that button and compare to the correct answer
                // if right, you can keep score the same or increase
                // if wrong, you can lower the score
            // after comparison and score calculation,
                // old question disappears, new question appears
                    // increase the counter by 1 to get to the next question
                // compare counter to length of the array, if less go to next question
                    // repeat everything we did above
            // once the counter is equal to length of the array, we don't show the next question, the game ends
            // Last screen all done
                // Title
                // Your final score
                // input
                // submit button
            // Once you submit the score
                // Grab the initial array from localstorage, if there is one, and convert it, otherwise use an empty array
                // take the score and initials, put it into an array, stringify that array, and then put it in localstorage
                // You'll save that score, and the initials to localStorage
                