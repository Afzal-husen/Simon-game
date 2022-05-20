
let userClickedPattern = [];
let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let randomNumber;
let randomChosenColour;
let level = 0;
let isInTheGame = false;

$(document).on("keypress", function() {
  if(!isInTheGame) {
    nextSequence()
    isInTheGame = true;
  }
})


$(".btn").click(function(){
  let userChosenColour = $(this).attr("id")
  userClickedPattern.push(userChosenColour)
  //console.log(userClickedPattern)
  animatePress(userChosenColour);
  playSound(userChosenColour)

  checkAnswer(userClickedPattern.length - 1);
  
})



let nextSequence = () => {

    userClickedPattern = []
    
    randomNumber = Math.floor((Math.random() * 4));
    randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour);
    // console.log(gamePattern)
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    level = level + 1;
    $("h1").html("level" + " " + level);
    
    playSound(randomChosenColour);
    
}


function playSound(name) {
      let audio = new Audio("sounds/" + name + ".mp3");
      audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed").fadeIn(100).fadeOut(100).fadeIn(100);
    
    setTimeout(function(){
      $("#" + currentColour).removeClass("pressed");
    }, 100)

}

function checkAnswer(currentLevel) {

  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence()
      },1000)
    }
  } 
  else {
    console.log("wrong");
    playSound("wrong");  
    $("body").addClass("game-over").fadeIn(100).fadeOut(100).fadeIn(100); 
    
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200) 

    $("h1").text("Game Over, Press Any Key to Restart")

    startOver();
  }
  
} 

function startOver() {
  level = 0;
  gamePattern = [];
  isInTheGame = false;
}

