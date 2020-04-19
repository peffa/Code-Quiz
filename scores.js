
    // has to reach out to localstorage using the same key that you put the information
var restartBtn = document.querySelector("button.restartBtn"),
    clearBtn = document.querySelector("button.clearBtn"),
    highScores = JSON.parse(localStorage.getItem("highScores") || "[]"),
    scoreList = document.getElementById("score-list");

    // sort scores high to low
    highScores.sort(function (a,b){
        return b.score - a.score
    })

    // make elements, put the info in it, and put it on the page.
    for (var s = 0; s < highScores.length; s++) {
        var newLi = document.createElement("li")
        newLi.textContent = highScores[s].name + " - " + highScores[s].score
        scoreList.appendChild(newLi)
    }

    // addeventlistener to clear button, and on click, clear localstorage
clearBtn.addEventListener("click", function () {
    localStorage.clear();
    history.back()
});

    // addeventlistener to play again
restartBtn.addEventListener("click", function () {
    history.back();
});
