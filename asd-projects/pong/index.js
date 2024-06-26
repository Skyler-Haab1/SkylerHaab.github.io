/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();
  const BALL_SPEED = 10;
  const PADDLE_SPEED = 15;
  const WINNING_SCORE = 10;
  let player1Score = 0;
  let player2Score = 0;

  var KEY = {
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83,
  };

  var gameIsOver = false;

  // Game Item Objects
  var leftPaddle = paddleFactory("#leftPaddle");
  var rightPaddle = paddleFactory("#rightPaddle");
  var ball = ballFactory("#ball");

  // one-time setup
  startBall();
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on("keyup", handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    if (!gameIsOver) {
      movePaddles();
      moveBall();
      wallCollision(ball);
      paddleCollision(ball, leftPaddle);
      paddleCollision(ball, rightPaddle);
      $("#player1Score").text(player1Score);
      $("#player2Score").text(player2Score);
      if (player1Score === WINNING_SCORE) {
        endGame("Player 1 Wins!");
      }
      else if (player2Score === WINNING_SCORE) {
        endGame("Player 2 Wins!");
      }
    }
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    console.log(event.key);
    if (event.which === KEY.UP) {
      console.log("up pressed for right paddle");
      rightPaddle.speedY = -PADDLE_SPEED;
    }
    else if (event.which === KEY.DOWN) {
      console.log("down pressed for right paddle");
      rightPaddle.speedY = PADDLE_SPEED;
    }
    if (event.which === KEY.W) {
      console.log("up pressed for left paddle");
      leftPaddle.speedY = -PADDLE_SPEED;
    }
    else if (event.which === KEY.S) {
      console.log("down pressed for left paddle");
      leftPaddle.speedY = PADDLE_SPEED;
    }
  }

  function handleKeyUp(event) {
    console.log(event.key);
    if (event.which === KEY.UP || event.which === KEY.DOWN) {
      console.log("up/down key released for right paddle");
      rightPaddle.speedY = 0;
    }
    if (event.which === KEY.W || event.which === KEY.S) {
      console.log("up/down key released for left paddle");
      leftPaddle.speedY = 0;
    }
  }

  function movePaddles() {
    moveObject(leftPaddle);
    moveObject(rightPaddle);
    if (leftPaddle.y < 107) {
      leftPaddle.y = 107;
    }
    else if (leftPaddle.y + leftPaddle.height > BOARD_HEIGHT + 100) {
      leftPaddle.y = BOARD_HEIGHT - leftPaddle.height + 100;
    }
    if (rightPaddle.y < 107) {
      rightPaddle.y = 107;
    }
    else if (rightPaddle.y + rightPaddle.height > BOARD_HEIGHT + 100) {
      rightPaddle.y = BOARD_HEIGHT - rightPaddle.height + 100;
    }
  }

  function moveBall() {
    moveObject(ball);
  }

  function wallCollision(object) {
    if (object.y <= 107 || object.y + object.height >= BOARD_HEIGHT + 100) {
      object.speedY *= -1;
    }
    if (object.x <= 0 || object.x + object.width >= BOARD_WIDTH) {
      object.speedX *= -1;
      if (object.x <= 0) {
        player2Score++;
        $("#player2Score").text(player2Score);
        if (player2Score === WINNING_SCORE) {
          endGame("Player 2 Wins!");
        } else {
          startBall();
        }
      }
      else {
        player1Score++;
        $("#player1Score").text(player1Score);
        if (player1Score === WINNING_SCORE) {
          endGame("Player 1 Wins!");
        }
        else {
          startBall();
        }
      }
    }
    if (
      object.x <= leftPaddle.x + leftPaddle.width &&
      object.x + object.width >= leftPaddle.x &&
      object.y <= leftPaddle.y + leftPaddle.height &&
      object.y + object.height >= leftPaddle.y
    ) {
      object.speedX *= -1;
    }
    if (
      object.x <= rightPaddle.x + rightPaddle.width &&
      object.x + object.width >= rightPaddle.x &&
      object.y <= rightPaddle.y + rightPaddle.height &&
      object.y + object.height >= rightPaddle.y
    ) {
      object.speedX *= -1;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function startBall() {
    ball.x = (BOARD_WIDTH - ball.width) / 2;
    ball.y = (BOARD_HEIGHT - ball.height) / 2;
    ball.speedX = (Math.random() * BALL_SPEED * 2 + BALL_SPEED) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedY = (Math.random() * BALL_SPEED * 2 + BALL_SPEED) * (Math.random() > 0.5 ? -1 : 1);
    $(ball.id).css({
      left: ball.x,
      top: ball.y,
    });
  }

  function paddleFactory(id) {
    var paddle = {};
    paddle.id = id;
    paddle.x = parseFloat($(id).css("left"));
    paddle.y = parseFloat($(id).css("top"));
    paddle.speedX = 0;
    paddle.speedY = 0;
    paddle.width = $(id).width();
    paddle.height = $(id).height();
    return paddle;
  }

  function ballFactory(id) {
    var ball = {};
    ball.id = id;
    ball.x = parseFloat($(id).css("left"));
    ball.y = parseFloat($(id).css("top"));
    ball.speedX = 0;
    ball.speedY = 0;
    ball.width = $(id).width();
    ball.height = $(id).height();
    return ball;
  }
  
  function moveObject(object) {
    object.x += object.speedX;
    object.y += object.speedY;
    $(object.id).css({
      left: object.x,
      top: object.y,
    });
  }

  function endGame(winner) {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
    $("#centerLine").hide();
    $("body").append(`<div id="winningScreen">${winner}<br>Press 'CTRL + R' to Play Again :)</div>`);
    $("#winningScreen").css({
      color: "white",
      fontSize: "80px",
      textAlign: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    });
  }
}