var btnColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern =[];

var start = false;

var level = 0;

$(document).on("keypress", function(){
    
   if(!start){
       nextSeq();
       start = true;
   }
});

$(".btn").on("click", function(){
    var userChosenColor = $(this).attr("id");
    
    userClickPattern.push(userChosenColor);
        // console.log(userClickPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickPattern.length-1);  
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickPattern[currentLevel]){

        console.log("Success");

       if(userClickPattern.length === gamePattern.length){

           setTimeout(function(){
               nextSeq();
           }, 1000);
        }

    }else {
        playSound("wrong");
    
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        
        $("#level-title").text("Game Over, Press Any Key to Restart");
    
        startOver();
    }
};

function nextSeq(){

    userClickPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var ranNum = Math.floor(Math.random() * 4);
    var ranChosenColors = btnColors[ranNum];
    gamePattern.push(ranChosenColors);

    $("#"+ranChosenColors).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(ranChosenColors);
}

function playSound(name){

    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}

function animatePress(currentColor){
    $('.' + currentColor).addClass("pressed");
    setTimeout(function(){
        $('.' + currentColor).removeClass("pressed");
    }, 100);
};

function startOver(){
    level = 0;
    gamePattern = [];
    start = false;
}