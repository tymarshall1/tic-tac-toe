document
  .querySelector("#vsPlayer")
  .addEventListener("click", () => DisplayController.startPlayer());

document
  .querySelector("#vsComputer")
  .addEventListener("click", () => DisplayController.startComputer());

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => {
    return board;
  };

  const markBoard = (player, index) => {
    if (!isTaken(index)) {
      board[index] = player.getPiece();
    }

    //hasWon
  };

  const isTaken = (index) => {
    if (board[index] === "X" || board[index] === "O") {
      return true;
    }
    return false;
  };

  const hasWon = () => {};

  return {
    markBoard,
    getBoard,
  };
})();

const DisplayController = (() => {
  const startScreen = document.querySelector("#startScreen");
  const choosePieceScreen = document.querySelector("#selectionScreen");
  let playerOne = null;
  let playerTwo = null;

  const startPlayer = () => {
    clearScreen(startScreen);
    showSelectionScreen();
  };

  const startComputer = () => {
    clearScreen(startScreen);
    showSelectionScreen();
  };

  const clearScreen = (screen) => {
    screen.removeAttribute("class");
    screen.classList.add("hide-screen");
  };

  const showSelectionScreen = () => {
    choosePieceScreen.removeAttribute("class");
    choosePieceScreen.classList.add("choose-piece-screen");
    const xIconBtn = document.querySelector("#xIcon");
    const oIconBtn = document.querySelector("#oIcon");
    const backBtn = document.querySelector("#backBtn");

    backBtn.addEventListener("click", () => showStartScreen());
    xIconBtn.addEventListener("click", (e) => setPlayers(e));
    oIconBtn.addEventListener("click", (e) => setPlayers(e));
  };

  const showStartScreen = () => {
    clearScreen(choosePieceScreen);
    startScreen.classList.add("start-screen");
  };

  const setPlayers = (e) => {
    e.target.alt === "X"
      ? ((playerOne = PlayerFactory("placeholder", "X")),
        (playerTwo = PlayerFactory("placerholder", "O")))
      : ((playerOne = PlayerFactory("placeholder", "O")),
        (playerTwo = PlayerFactory("placerholder", "X")));
  };

  return {
    startPlayer,
    startComputer,
  };
})();

const PlayerFactory = (name, piece) => {
  const getName = () => name;

  const getPiece = () => piece;

  return {
    getName,
    getPiece,
  };
};
