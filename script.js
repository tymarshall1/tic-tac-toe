document
  .querySelector("#playervsPlayer")
  .addEventListener("click", () => DisplayController.showSelectionScreen());

const GameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
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

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    plays = 0;
  };

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
    resetBoard,
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

  const showStats = () => {
    const stats = document.querySelector("#stats");
    addScreenClass(stats, "statistics");
  };

  const showStartScreen = () => {
    clearScreen(choosePieceScreen);
    addScreenClass(startScreen, "start-screen");
  };

  const showGameScreen = () => {
    clearScreen(choosePieceScreen);
    addScreenClass(gameScreen, "game-screen");
    showStats();
    updateTurnOnScreen();

    const gridSquares = document.querySelectorAll(".grid-square");
    gridSquares.forEach((square, index) => {
      square.id = index;
      square.addEventListener("click", () => {
        addPieceToScreen(square);
        updateTurnOnScreen();
        updateIfWinnerOnscreen(gridSquares);
      });
    });

    document.querySelector("#resetBtn").addEventListener("click", () => {
      GameBoard.resetBoard();
      clearGameBoardOnScreen(gridSquares);
    });
  };

  const addPieceToScreen = (square) => {
    if (GameBoard.determineTurn() === "player one") {
      GameBoard.markBoard(playerOne, square.id);
      square.style.backgroundColor = "red";
    } else {
      GameBoard.markBoard(playerTwo, square.id);
      square.style.backgroundColor = "blue";
    }
    square.textContent = GameBoard.getBoard()[square.id];
  };

  const updateIfWinnerOnscreen = (gridSquares) => {
    let winner = "no winner";
    let turn = GameBoard.determineTurn();

    turn === "player two"
      ? (winner = GameBoard.checkForWinner(playerOne.getPiece()))
      : (winner = GameBoard.checkForWinner(playerTwo.getPiece()));

    if (winner === "no winner") return;
    else if (winner === "X wins" || winner === "O wins") {
      document.querySelector("#turn").textContent = winner;
      gridSquares.forEach((indvSquare) => {
        indvSquare.style.pointerEvents = "none";
        indvSquare.style.opacity = 0.7;
      });
    }
  };

  const updateTurnOnScreen = () => {
    const turnHeader = document.querySelector("#turn");

    GameBoard.determineTurn() === "player one"
      ? (turnHeader.textContent = `Turn: ${playerOne.getPiece()}`)
      : (turnHeader.textContent = `Turn: ${playerTwo.getPiece()}`);
  };

  const setPlayers = (e) => {
    e.target.alt === "X"
      ? ((playerOne = PlayerFactory("placeholder", "X")),
        (playerTwo = PlayerFactory("placerholder", "O")))
      : ((playerOne = PlayerFactory("placeholder", "O")),
        (playerTwo = PlayerFactory("placerholder", "X")));
  };

  const clearGameBoardOnScreen = (gridSquares) => {
    updateTurnOnScreen();
    gridSquares.forEach((square) => {
      square.removeAttribute("style");
      square.textContent = "";
    });
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
