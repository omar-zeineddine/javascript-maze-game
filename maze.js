// execute code only after html file has completely been loaded

window.onload = function () {
  // variable declarations
  const game = document.getElementById("game");
  const maze_borders = game.getElementsByClassName("boundary");

  // start and end
  const start = document.getElementById("start");
  const end = document.getElementById("end");

  // scores & game state
  const status = document.getElementById("status");
  let game_state = "start";
  let score = 0;

  function startGame() {
    end.addEventListener("mouseover", win);
    game_state = "active";
    status.innerHTML = "Avoid touching the maze walls";
    colorBoundaries("#564a4a");
    borderCheck();
  }

  function borderCheck() {
    document.addEventListener("mousemove", function (e) {
      // if cursor touches a div with boundary class user loses
      const cursor = e.target.classList.value;
      if (cursor == "boundary" && game_state == "active") {
        colorBoundaries("#cd4439");
        score -= 10;
        status.innerHTML = `You lost<br> Score: ${score}`;
        game_state = "lost";
      }
    });
  }

  function win() {
    if (game_state != "lost" && game_state != "start") {
      colorBoundaries("#4aa96c");
      score += 5;
      status.innerHTML = `You won<br> Score: ${score}`;
      game_state = "start";
    }
  }

  // div colors
  function colorBoundaries(color) {
    for (let i = 0; i < maze_borders.length; i++) {
      maze_borders[i].style.background = color;
    }
  }

  // restart game
  function reset() {
    score = 0;
    status.innerHTML = "Game restarted";
  }
};
