var buttonColors = ["red", "blue", "green", "yellow"],
    gamePattern = [],
    userClickedPattern = [],
    started = false,
    level = 0;

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    //pick random color from array with random number
    var randomChosenColor = buttonColors[randomNumber];

    //Flash randomChosen Color
    $("#" + randomChosenColor).fadeOut(200).fadeIn(100);

    //Push random chosen color to array created on Line 2 
    gamePattern.push(randomChosenColor);

    //play sound to random color chosen
    playSound(randomChosenColor);
}

// plays sounds
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//Handler Function
$(".btn-lg").click(function() {

    if (gamePattern.length > 0) {
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    }

});

//animation when a colored button is pressed
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//click event function to start game, only if it has not already started
$(".start").click(function() {
    if (!started) {
        $(".quit").addClass("visible");
        $(".st-btn").addClass("hide");
        setTimeout(() => {
            nextSequence();
            started = true;
        }, 1000);
    }
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
            userArray[userArray.length - 1].userLevel = level;
        }

    } else {
        startOver();
    }
}

function startOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over!");
    displayStartBtn();
    started = false;
    level = 0;
    gamePattern = [];
}

$(".btn").click(function() {
    $(this).addClass("pressed");
    setTimeout(function() {
        $(".btn").removeClass("pressed");
    }, 100);
});

$(".quit").click(function() {
    startOver();
    displayStartBtn();
});

function displayStartBtn() {
    $(".st-btn").removeClass("hide");
    $(".quit").removeClass("visible");
};

// Instruction modal
const modal = document.querySelector(".modal");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

$(".trigger").click(function() {
    toggleModal();
});

$(".close-button").click(function() {
    toggleModal();
});

document.addEventListener("click", windowOnClick);