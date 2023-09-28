document
  .querySelector("#playervsPlayer")
  .addEventListener("click", () => DisplayController.showSelectionScreen());

const GameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  let plays = 0;

  const getBoard = () => {
    return board;
  };

  const markBoard = (player, index) => {
    if (!isTaken(index)) {
      board[index] = player.getPiece();
      ++plays;
    }
  };

  const isTaken = (index) => {
    if (board[index] === "X" || board[index] === "O") {
      return true;
    }
    return false;
  };

  const determineTurn = () => {
    return plays % 2 === 0 ? "player one" : "player two";
  };

  const resetBoard = () => {};

  const checkForWinner = (peice) => {
    //rows
    if (board[0] === peice && board[1] === peice && board[2] === peice)
      return `${peice} wins`;
    if (board[3] === peice && board[4] === peice && board[5] === peice)
      return `${peice} wins`;
    if (board[6] === peice && board[7] === peice && board[8] === peice)
      return `${peice} wins`;

    //colls
    if (board[0] === peice && board[3] === peice && board[6] === peice)
      return `${peice} wins`;
    if (board[1] === peice && board[4] === peice && board[7] === peice)
      return `${peice} wins`;
    if (board[2] === peice && board[5] === peice && board[8] === peice)
      return `${peice} wins`;

    //diagonals
    if (board[0] === peice && board[4] === peice && board[8] === peice)
      return `${peice} wins`;
    if (board[2] === peice && board[4] === peice && board[6] === peice)
      return `${peice} wins`;

    return "no winner";
  };

  return {
    markBoard,
    getBoard,
    determineTurn,
    checkForWinner,
  };
})();

const DisplayController = (() => {
  const startScreen = document.querySelector("#startScreen");
  const choosePieceScreen = document.querySelector("#selectionScreen");
  const gameScreen = document.querySelector("#gameScreen");
  let playerOne = null;
  let playerTwo = null;

  //could just make this one function called swapScreens
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
    oIconBtn.addEventListener("click", (e) => {
      setPlayers(e);
      showGameScreen();
    });
  };

  const showStartScreen = () => {
    clearScreen(choosePieceScreen);
    addScreenClass(startScreen, "start-screen");
  };

  const showGameScreen = () => {
    clearScreen(choosePieceScreen);
    addScreenClass(gameScreen, "game-screen");
    let winner = "no winner";

    const gridSquares = document.querySelectorAll(".grid-square");

    gridSquares.forEach((square, index) => {
      square.id = index;
      square.addEventListener("click", () => {
        const turn = GameBoard.determineTurn();
        turn === "player one"
          ? (GameBoard.markBoard(playerOne, square.id),
            (winner = GameBoard.checkForWinner(playerOne.getPiece())))
          : (GameBoard.markBoard(playerTwo, square.id),
            (winner = GameBoard.checkForWinner(playerTwo.getPiece())));

        addPieceToScreen(square, turn, winner, gridSquares);

        console.log(winner);
      });
    });
  };

  const addPieceToScreen = (square, turn, winner, gridSquares) => {
    square.textContent = GameBoard.getBoard()[square.id];
    turn === "player one"
      ? (square.style.backgroundColor = "red")
      : (square.style.backgroundColor = "blue");

    if (winner === "no winner") return;
    else if (winner === "X wins" || winner === "O wins") {
      gridSquares.forEach((indvSquare) => {
        indvSquare.style.pointerEvents = "none";
        indvSquare.style.opacity = 0.7;
      });
    }
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
