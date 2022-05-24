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

  // timers
  const bestLap = document.getElementById("best-lap");
  const lastLap = document.getElementById("last-lap");

  let t0, t1;
  let laps = [];

  // example div - result output
  const result = document.querySelector(".example");

  function startGame() {
    t0 = new Date();
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
        result.innerHTML = `${score}`;
        game_state = "lost";
      }
    });
  }

  function win() {
    if (game_state != "lost" && game_state != "start") {
      colorBoundaries("#4aa96c");
      score += 5;
      status.innerHTML = `You won<br> Score: ${score}`;
      result.innerHTML = `${score}`;
      game_state = "start";
      t1 = new Date();
      let lap = (t1 - t0) / 1000;
      laps.push(lap);
      let best = Math.min(...laps);
      console.log(laps);
      lastLap.innerHTML = ` ${lap}s`;
      bestLap.innerHTML = ` ${best}s`;
    }
  }

  // div colors
  function colorBoundaries(color) {
    for (let i = 0; i < maze_borders.length; i++) {
      maze_borders[i].style.background = color;
      result.style.background = color;
    }
  }

  // restart game
  function reset() {
    score = 0;
    laps = [];
    status.innerHTML = "Game restarted";
    result.innerHTML = `${score}`;
    lastLap.innerHTML = ``;
    bestLap.innerHTML = ``;
  }

  // user message when cursor is out of bounds
  function outOfBounds() {
    status.innerHTML =
      "You left the maze, start again by hovering over S<br> to restart game score, click on S";
    colorBoundaries("#cd4439");
    game_state = "start";
  }

  // Event Listeners
  start.addEventListener("mouseover", startGame);
  start.addEventListener("click", reset);
  game.addEventListener("mouseleave", outOfBounds);
};
