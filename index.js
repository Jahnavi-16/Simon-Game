let buttonColours=["red", "blue", "green", "yellow"];
let gamePattern=[];
let userClickedPattern =[];
let a =false
let level = 0;
function nextSequence()
{
    ++level;
    $("#level-title").text("Level "+ level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("."+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    userClickedPattern=[];
}
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColor) {
    $("."+currentColor).addClass("pressed");
    setTimeout(function () {
        $("."+currentColor).removeClass("pressed");
    }, 100);
}
$(".btn").on('click',function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

$("*").keydown(function() {
    if(!a){
        nextSequence();
        a=!a;
        $("#level-title").text("Level "+ level);
    }
})

function checkAnswer(currentLevel) {
            if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
                console.log("Success");
                if(userClickedPattern.length===gamePattern.length){
                    setTimeout(() => {
                        nextSequence();
                    }, 1000);
                }            
            }
            else{
                let audio  = new Audio('sounds/wrong.mp3');
                audio.play();
                $("body").addClass("game-over");
                setTimeout(() => {
                    $("body").removeClass("game-over");
                }, 200);
                $("h1").text("Game Over, Press Any Key to Restart");
                startOver(); 
            }
            
}
function startOver() {
    level=0;
    userClickedPattern=[];
    gamePattern=[];
    a=false;
}