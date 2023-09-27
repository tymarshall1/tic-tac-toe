document
  .querySelector("#playervsPlayer")
  .addEventListener("click", () => DisplayController.showSelectionScreen());

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
  const gameScreen = document.querySelector("#gameScreen");
  let playerOne = null;
  let playerTwo = null;

  const clearScreen = (screen) => {
    screen.removeAttribute("class");
    screen.classList.add("hide-screen");
  };

  const addScreenClass = (screen, screenClass) => {
    screen.removeAttribute("class");
    screen.classList.add(screenClass);
  };

  const showSelectionScreen = () => {
    clearScreen(startScreen);
    addScreenClass(choosePieceScreen, "choose-piece-screen");

    const xIconBtn = document.querySelector("#xIcon");
    const oIconBtn = document.querySelector("#oIcon");
    const backBtn = document.querySelector("#backBtn");

    backBtn.addEventListener("click", () => showStartScreen());
    xIconBtn.addEventListener("click", (e) => {
      setPlayers(e);
      showGameScreen();
    });
    oIconBtn.addEventListener("click", (e) => setPlayers(e));
  };

  const showStartScreen = () => {
    clearScreen(choosePieceScreen);
    addScreenClass(startScreen, "start-screen");
  };

  const showGameScreen = () => {
    clearScreen(choosePieceScreen);
    addScreenClass(gameScreen, "game-screen");
  };

  const setPlayers = (e) => {
    e.target.alt === "X"
      ? ((playerOne = PlayerFactory("placeholder", "X")),
        (playerTwo = PlayerFactory("placerholder", "O")))
      : ((playerOne = PlayerFactory("placeholder", "O")),
        (playerTwo = PlayerFactory("placerholder", "X")));
  };

  return {
    showSelectionScreen,
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
