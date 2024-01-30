/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {       //variable for assigning which key codes are assigned to which keyboard inputs
    ENTER: 13,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    RESET: 82,
    W: 87,
    A: 65,
    S: 83,
    D: 68,
  };
  var boardHeight = $("#board").height();        //creates the boardHeight variable needed to make the wallCollision function later
  var boardWidth = $("#board").width();        //creates the boardWidth variable needed to make the wallCollision function later

  // Game Item Objects
var walker = {          //variable that stores an object such that you can monitor and control the x/y position and x/y speed of the walker game item
  positionX: 5,
  positionY: 5,
  speedX: 0,
  speedY: 0,
  width: $("#walker").width(),
  height: $("#walker").height(),
}

var walker2 = {       //variable that stores an object such that you can monitor and control the x/y position and x/y speed of the walker2 game item
  positionX2: 385,
  positionY2: 385,
  speedX2: 0,
  speedY2: 0,
  width2: $("#walker2").width(),
  height2: $("#walker2").height(),
}

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);  

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {       // function for repositioning the game item, checking for wall collisions, and redrawing the game item on each new frame
    repositionGameItem();
    wallCollision();
    redrawGameItem();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {         // function for deciding what to console log when pressing any movements keys among the two players
    console.log(event.key);
    if (event.which === KEY.ENTER) {
      console.log("enter pressed");
    }
    else if (event.which === KEY.LEFT) {
      console.log("left pressed");
      walker.speedX = -5;
    }
    else if (event.which === KEY.UP) {
      console.log("up pressed");
      walker.speedY = -5;
    }
    else if (event.which === KEY.RIGHT) {
      console.log("right pressed");
      walker.speedX = 5;
    }
    else if (event.which === KEY.DOWN) {
      console.log("down pressed");
      walker.speedY = 5;
    }
    else if (event.which === KEY.RESET) {
      console.log("reset key pressed");
      endGame();
    }
    else if (event.which === KEY.A) {
      console.log("left pressed for player 2");
      walker2.speedX2 = -5;
    }
    else if (event.which === KEY.D) {
      console.log("right pressed for player 2");
      walker2.speedX2 = 5;
    }
    else if (event.which === KEY.W) {
      console.log("up pressed for player 2");
      walker2.speedY2 = -5;
    }
    else if (event.which === KEY.S) {
      console.log("down pressed for player 2");
      walker2.speedY2 = 5;
    }
  }

  function handleKeyUp(event) {          // this function sets the speedX and speedY properties to 0 whenever the arrow keys are released
    if (event.which === KEY.RIGHT || event.which === KEY.LEFT || event.which === KEY.D || event.which === KEY.A) {
      walker.speedX = 0;
      walker2.speedX2 = 0;
    }
    if (event.which === KEY.UP || event.which === KEY.DOWN || event.which === KEY.W || event.which === KEY.S) {
      walker.speedY = 0;
      walker2.speedY2 = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);
    location.reload();

    // turn off event handlers
    $(document).off();
  }

  function repositionGameItem() {       // repositions the GameItem to move along the x and y axis
    walker.positionX += walker.speedX;
    walker.positionY += walker.speedY;
    walker2.positionX2 += walker2.speedX2;
    walker2.positionY2 += walker2.speedY2;
  }

  function redrawGameItem() {       // redraws the GameItem to move along the x and y axis
    $("#walker").css("left", walker.positionX);
    $("#walker").css("top", walker.positionY);
    $("#walker2").css("left", walker2.positionX2);
    $("#walker2").css("top", walker2.positionY2);
  }

  function wallCollision() {        // allows the walker to collide with a wall instead of moving through it
    if (walker.positionX > boardWidth - walker.width|| walker.positionX < 0) {
      walker.positionX -= walker.speedX;
    }
    if (walker.positionY > boardHeight - walker.height|| walker.positionY < 0) {
      walker.positionY -= walker.speedY;
    }
    if (walker2.positionX2 > boardWidth - walker2.width2|| walker2.positionX2 < 0) {
      walker2.positionX2 -= walker2.speedX2;
    }
    if (walker2.positionY2 > boardHeight - walker2.height2|| walker2.positionY2 < 0) {
      walker2.positionY2 -= walker2.speedY2;
    }
  }

}
