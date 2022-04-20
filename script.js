//global constants
const sound = new Audio('https://cdn.glitch.global/1bf68876-a5f3-4284-954b-5c4249c6a68c/Wawa.m4a?v=1650482761812')
sound.volume = .1;
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; // how long to wait before starting playback of the clue sequence

//Global Variables
var clueHoldTime = 500; //how long to hold each clue's light/sound
var pattern;
var progress;
var gamePlaying = false;
var tonePlaying = false;
var wrong = false;
var sameRound = false; //checks to see if the user is on the same sequence
var volume = 0.5; //must be between 0.0 and 1.0
var guessCounter = 0; //keeps track of which button in the sequence the user is on
var turnChecker; //checks to see which turn the user is on
var mistakeCount;



function difficulty(){
  //chooses game difficulty by adjusting sequence length
  var diff = window.prompt("Choose 'h' for hard mode or 'e' for easy mode: ");
  if (diff == ""){
    alert("Invalid choice")
    startGame();
  }
  if (diff == 'e'){
    alert("You chose easy mode. Calibrating game.....");
    pattern = [0,0,0,0,0];
  }
  else if (diff == 'h'){
    alert("You chose hard mode. Calibrating game.....");
     pattern = [0,0,0,0,0,0,0,0,0,0];
  }
  else if (!diff){
    stopGame();
  }
  else {
    alert("Invalid choice")
    startGame();
    return;
  }
  generatePattern();
}

function generatePattern(){
  //creates random secret pattern
  for(let i=0;i<pattern.length;i++){
    pattern[i] = Math.floor(Math.random() * 5) + 1;
  }
}

function startGame(){
  //initialize game variables and starts game
  progress = 0;
  turnChecker = 0;
  gamePlaying = true;
  mistakeCount = 2;
  difficulty();
  //swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  playClueSequence();
}

function stopGame(){
  //stops game
  gamePlaying = false;
  //swap the Start and Stop buttons
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
}


//Sound Synthesis Functions
//determines the pitch (higher # = higher pitch; lower # = lower pitch)
const freqMap = {
  1: 231.6,
  2: 299.6,
  3: 362,
  4: 436.2,
  5: 483.6
}


function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  context.resume()
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}

function startTone(btn){
  if (!gamePlaying){
    context.resume()
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    context.resume()
    tonePlaying = true
  }
  if(!tonePlaying){
   if (btn != pattern[guessCounter]){
      sound.play();
    } 
    else {
      context.resume()
      o.frequency.value = freqMap[btn]
      g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
      context.resume()
      tonePlaying = true
    }
  }
}

function stopTone(){
  g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
  tonePlaying = false
}


// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext 
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)


function lightButton(btn){
  //lights the button
  document.getElementById("button"+btn).classList.add("lit")
}

function clearLightButton(btn){
  //unlights button
  document.getElementById("button"+btn).classList.remove("lit")
}

function playSingleClue(btn){
  //plays clue on click
  if (gamePlaying){
    lightButton(btn);
    playTone(btn,clueHoldTime);
    setTimeout(clearLightButton,clueHoldTime,btn);
  }
}

function playClueSequence(){
  //plays full clue seuqence for designated turn
  if (!sameRound){
    clueHoldTime -= 20;
    turnChecker = 0;
    guessCounter = 0;
    wrong = false;
  }
  context.resume()
  wrong = false;
  let delay = nextClueWaitTime; //set delay to intial wait time
  for (let i=0;i<=progress;i++){ //for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) //set a timeout to play that clue
    delay += clueHoldTime
    delay += cluePauseTime;
  }
}

function loseGame(){
  stopGame();
  alert("Game Over. You lost.");
}

function winGame(){
   stopGame();
  alert("Game Over. You won!");
}

function wrongGuessShake(btn,num){
  //shakes the choosen button when it does not match correct sequence
  var input = document.getElementById("button"+btn);
  input.classList.add("shake");
}

function alertWrongGuess(){
  //displays the number of guesses user has left
  if (mistakeCount != 2){
    alert("Incorrect Guess! You have "+mistakeCount+" more try. Seqence will now repeat.");
  }
}

function clearShakeButton(btn){
  /*stops the button from shaking/allows it 
  to be able to shake mutliple times*/
  document.getElementById("button"+btn).classList.remove("shake")
}

function guess(btn){
  //tracks user input, checks if it is correct, and advances game
  //determine if the win or lose coniditons are met
  console.log("user guessed: " + btn);
  if (!gamePlaying){return;}
  turnChecker++;
  if (btn != pattern[guessCounter]){
    //Guess not correct
    wrong = true;
    sameRound = true;
    turnChecker = 0;
    guessCounter = 0;
    mistakeCount--;
    if (mistakeCount == 0){
      //Out of tries... LOST GAME!
      wrongGuessShake(btn,pattern[guessCounter]);
      setTimeout(loseGame,clueHoldTime);
      return;
    }
    wrongGuessShake(btn,pattern[guessCounter]);
    setTimeout(clearShakeButton,clueHoldTime,btn);
    setTimeout(alertWrongGuess,clueHoldTime);
    setTimeout(playClueSequence(),clueHoldTime);
    return;
  }
  if (turnChecker != progress + 1){
    //Turn not over, guessCounter incremented
    guessCounter++;
    return;
  }
  if (turnChecker != pattern.length){
    //Not the last turn, increment progress and play next clue sequence
    progress++;
    sameRound = false;
    mistakeCount = 2;
    playClueSequence();
    return;
  }
  //All conditions met! WON GAME!!
  winGame();
}
