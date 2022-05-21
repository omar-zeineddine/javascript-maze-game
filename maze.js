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
};
