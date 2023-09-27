const vsComputer = document.querySelector("#vsComputer");
const vsPlayer = document.querySelector("#vsPlayer");

vsPlayer.addEventListener("click", () => DisplayController.startPlayer());

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
  const startScreen = document.querySelector(".game-container");

  const startPlayer = () => {
    clearScreen();
    showSelectionScreen();
  };

  const startComputer = () => {};

  const clearScreen = () => {
    while (startScreen.firstChild) {
      startScreen.removeChild(startScreen.lastChild);
    }
  };

  const showSelectionScreen = () => {
    const choosePieceScreen = document.createElement("div");
    const x = document.createElement("img");
    const o = document.createElement("img");
    const instruction = document.createElement("h1");

    x.src = "assets/x.svg";
    o.src = "assets/o.svg";
    instruction.textContent = "Player One Gets First Choice";

    x.addEventListener("click", () => {
      console.log("placeholder");
    });

    o.addEventListener("click", () => {
      console.log("placerholder");
    });

    choosePieceScreen.classList.add("choose-piece-screen");

    choosePieceScreen.appendChild(x);
    choosePieceScreen.appendChild(o);
    startScreen.appendChild(instruction);
    startScreen.appendChild(choosePieceScreen);
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

const tyler = PlayerFactory("tyler", "X");
const bob = PlayerFactory("bob", "O");
