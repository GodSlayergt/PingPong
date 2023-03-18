let rode1 = document.getElementById("rode1");
let rode2 = document.getElementById("rode2");
let ball = document.getElementById("ball");
let gamebox = document.getElementById("gamebox");
let zpressed = false;
let xpressed = false;
let startGame = false;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
  if (e.key === "z") {
    zpressed = true;
  } else if (e.key === "x") {
    xpressed = true;
  } else if (e.key === "Enter") {
    if (!startGame) {
      startGame = true;
      gameloop();
    }
  }
}

function keyUpHandler(e) {
  if (e.key === "z") {
    zpressed = false;
  } else if (e.key === "x") {
    xpressed = false;
  }
}

let Vx = -2;
let Vy = -3;
let V = Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy, 2));

function reset() {
  startGame = false;
  ball.style.left = "50%";
  ball.style.top = "50%";
  Vx = -2;
  Vy = -3;
  V = Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy, 2));
}

function checkcollision(activepaddle) {
  let balltop = ball.offsetTop;
  let ballbottom = ball.offsetTop + ball.offsetHeight;
  let ballleft = ball.offsetLeft;
  let ballright = ball.offsetLeft + ball.offsetWidth;

  let paddletop = activepaddle.offsetTop;
  let paddlebottom = activepaddle.offsetTop + activepaddle.offsetHeight;
  let paddleleft = activepaddle.offsetLeft;
  let paddleright = activepaddle.offsetLeft + activepaddle.offsetWidth;

  if (
    ballright > paddleleft &&
    ballleft < paddleright &&
    ballbottom > paddletop &&
    balltop < paddlebottom
  ) {
    return true;
  } else {
    return false;
  }
}

let rode2Score = 0;
let rode1Score = 0;

function gameloop() {
  if (ball.offsetLeft < 0) {
    Vx = -Vx;
  }
  if (ball.offsetLeft > gamebox.offsetWidth - ball.offsetWidth) {
    Vx = -Vx;
  }
  if (ball.offsetTop < 0) {
    rode2Score += 1;
    alert(`Rode2 wins with a score of ${rode2Score}`);
    reset();
  }
  if (ball.offsetTop > gamebox.offsetHeight - ball.offsetHeight) {
    rode1Score += 1;
    alert(`Rode1 wins with a score of ${rode1Score}`);
    reset();
  }

  let paddle = ball.offsetLeft < gamebox.offsetHeight / 2 ? rode1 : rode2;

  let ballcenterX = ball.offsetLeft + ball.offsetWidth / 2;
  let paddlecenterX = paddle.offsetLeft + paddle.offsetWidth / 2;

  let angle = 0;

  if (checkcollision(paddle)) {
    if (paddle === rode1) {
      if (ballcenterX < paddlecenterX) {
        angle = -Math.PI / 4;
      } else if (ballcenterX > paddlecenterX) {
        angle = Math.PI / 4;
      } else {
        angle = 0;
      }
    } else if (paddle === rode2) {
      if (ballcenterX < paddlecenterX) {
        angle = (-3 * Math.PI) / 4;
      } else if (ballcenterX > paddlecenterX) {
        angle = (3 * Math.PI) / 4;
      } else {
        angle = 0;
      }
    }
    V = V + 0.2;
    Vy = V * Math.cos(angle);
    Vx = V * Math.sin(angle);
  }

  let aidelay = 0.3;
  rode2.style.left =
    rode2.offsetLeft +
    (ball.offsetLeft - rode2.offsetLeft - rode2.offsetWidth / 2) * aidelay +
    "px";

  ball.style.left = ball.offsetLeft + Vx + "px";
  ball.style.top = ball.offsetTop + Vy + "px";

  if (zpressed && rode1.offsetLeft > 55) {
    rode1.style.left = rode1.offsetLeft - 5 + "px";
  }
  if (
    xpressed &&
    rode1.offsetTop < gamebox.offsetWidth - rode1.offsetWidth + 45
  ) {
    rode1.style.left = rode1.offsetLeft + 5 + "px";
  }
  if (startGame) requestAnimationFrame(gameloop);
}
