
// load boards
// const window = require('windows')
const easy = [
  "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
  "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
];
const medium = [
  "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
  "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
];
const hard = [
  "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
  "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
];

// console.log('hola');
//create game variables
var timer,timeReamining,lives,selectedNum,selectedTile,disableSelect;

window.onload = function() {
  // Run strat game button
  id("start-btn").addEventListener("click",startGame)
  // add event listener for each number
  for (let i = 0; i< id("number-container").children.length; i++) {
    id("number-container").children[i].addEventListener("click",function(){
      // if selecting is not disables
      if(!disableSelect){
        // if number is already selected
        if(this.classList.contains("Selected")){
          this.classList.remove("selected")
          selectedNum = null
        }
        else{
          // Deselecta all numbers
          for (let i = 0; i < 9; i++) {
            id("number-container").children[i].classList.remove("selected");           
          }
          // select it and updaet selectedNum Variable
          this.classList.add("selected")
          selectedNum = this
          updateMove()
        }
      }
    })
    
  }
}

function startGame() {
  // console.log('start!!');
  // chose board diggiculty
  if (id("diff-1").checked) board = easy[0];
  else if(id("diff-2").checked) board = medium[0];
  else board =hard[0];
  // set lives to 3 selecting numbers and titles
  lives = 3;
  disableSelect = false;
  id("lives").textContent = "Lives Remaining: 3";
  // creates borad based on difficulty
  generateBoard(board);
  startTimer();
  // set time baed theme
  if(id("theme-1").checked){
    qs("body").classList.remove("dark");
  }
  else{
    qs("body").classList.add("dark");
  }
  // show number container
  id("number-container").classList.remove("hidden")
}

function startTimer(){
  // set timer remaining based on input
  if(id("time-1").checked) timeReamining =100
  else if (id("time-2").checked) timeReamining =300
  else timeReamining =600
  // set timer for 1st second
  id("timer").textContent =  timeConversion(timeReamining)
  // sets timer to update evey sec
  timer = setInterval(function(){
    timeReamining --;
    if (timeReamining === 0) endGame()
    id("timer").textContent =  timeConversion(timeReamining)
  },1000)
}

// converts second into string of MM:SS format
function timeConversion(time){
  let minutes = Math.floor(time/60)
  if(minutes < 10 ) minutes = "0"+ minutes
  let seconds  = time%60
  if (seconds <10) seconds = "0" + seconds
  return minutes+":"+seconds
}

function generateBoard(board){
  // clear any previous boards
  clearPrevious(); 
  // let used to increment tile ids
  let idCount = 0
  for (let i = 0; i < 81; i++) {
    // create a new paragraph element
    let tile = document.createElement("p");
    // if the tile is not supposed to be blank
    if (board.charAt(i)!="-"){
      tile.textContent = board.charAt(i);
    }
    else{
      // add click event listener to tile
      tile.addEventListener("click",function(){
        // if selecting is not disabled
        id(!disableSelect)
        {
          // if the tilr is selected
          if(tile.classList.contains("selected")){
            tile.classList.remove("selected")
            selectedTile =null
          }
          else{
            for (let i = 0; i <81;i++){
              qsa(".title")[i].classList.remove("selected")
            }
            // add selectedTile update variable
            tile.classList.add("selected")
            selectedTile = tile
            updateMove()
          };
        }
      });
    }
    // Assign a tile id 
    tile.id = idCount
    // increment for next tiles
    idCount ++;
    // Add tile class to all tiles
    tile.classList.add("title")
    if ((tile.id>17 && tile.id <27)  || (tile.id>44 & tile.id<54)){
      tile.classList.add("bottomBorder");
    } 
    if ((tile.id+1)%9 == 3 || (tile.id+1)%9==6){
      tile.classList.add("rightBorder")
    }
    // add tiles to boards
    id("board").appendChild(tile)
  }
}

function updateMove() {
  // if a tile and a number is selected
  if (selectedTile && selectedNum) {
    // set the tile to the content 
    selectedTile.textContent =selectedNum.textContent;
    if (checkCorrect(selectedTile)) {
      // deselect the tile
      selectedTile.classList.remove("selected") 
      selectedNum.classList.remove("selected")
      selectedNum = null 
      selectedTile = null
      // if the number does not match the solution key 
      if (checkDone()) endGame()
    }else{
      // disable selecting new number for one second
      disableSelect  = true
      // make the tile turn red
      selectedTile.classList.add("incorrect")
      setTimeout(function(){
        // subtract
        lives--;
        if (lives ===0 )endGame()
        else{
          // update the live text
          id("lives").textContent = "Lives Remaining :" +lives
          // renable selctiong numeber and tiles
          disableSelect = false
        }
        // restore the tile colour and remove slected from both 
        selectedTile.classList.remove("incorrect")
        selectedTile.classList.remove("selected")
        selectedNum.classList.remove("selected")
        // clear the tiles text and clear selected variables
        selectedTile.textContent = ""
        selectedTile = null
        selectedNum = null
      },500)
    }
  }
}

function checkDone(){
  let tiles = qsa(".title")
  for (let i = 0; i<tile.length;i++){
    if (tiles[i].textContent === "")return false
  }
  return true
}

function endGame() {
  // disable moves stop timeer
  disableSelect = true
  clearTimeout(timer)
  // display txt win or loss
  if(lives ===0 || timeReamining === 0){
    id("lives").textContent = "Lost!!"
  }
  else{
    id("lives").textContent = "Won!!!"
  }
}

function checkCorrect(tile) {
  // set solution
  let solution
  if (id("diff-1").checked) solution = easy[1];
  else if(id("diff-2").checked) solution = medium[1];
  else solution =hard[1];
  if (solution.charAt(tile.id)=== tile.textContent) return true
  else return false
}

function clearPrevious(){
  // Access all of the titles
  let tile = qsa(".title")
  // Remove each tile
  for (let i = 0; i < tile.length; i++) {
    tile[i].remove();
  }
  // if there is a timer clear it
  if(timer) clearTimeout(timer);
  // Deselect any numbers
  for (let i = 0; i < id("number-container").children.length; i++) {
    id("number-container").children[i].classList.remove("selected");
  }
  // clear selected variables
  selectedNum= null
  selectedTile = null
}

// helper funtction
function id(id){
  return document.getElementById(id);
}

function qs(selector){
  return document.querySelector(selector);
}

function qsa(selector){
  return document.querySelectorAll(selector);
}



