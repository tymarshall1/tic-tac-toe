document
  .querySelector("#playervsPlayer")
  .addEventListener("click", () => DisplayController.showSelectionScreen());

const GameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  let plays = 0;

  let winTracker = {
    xWins: 0,
    oWins: 0,
    ties: 0,
  };

  const getBoard = () => {
    return board;
  };

  const getWinTracker = () => {
    return winTracker;
  };

  const markBoard = (player, index) => {
    if (!isTaken(index)) {
      board[index] = player.getPiece();
      ++plays;
      return true;
    }
    return false;
  };

  const trackWins = (piece) => {
    if (piece === "X") {
      winTracker.xWins++;
    } else if (piece === "O") {
      winTracker.oWins++;
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
    if (board[0] === peice && board[1] === peice && board[2] === peice) {
      trackWins(peice);
      return `${peice} wins`;
    }
    if (board[3] === peice && board[4] === peice && board[5] === peice) {
      trackWins(peice);
      return `${peice} wins`;
    }
    if (board[6] === peice && board[7] === peice && board[8] === peice) {
      trackWins(peice);
      return `${peice} wins`;
    }

    //colls
    if (board[0] === peice && board[3] === peice && board[6] === peice) {
      trackWins(peice);
      return `${peice} wins`;
    }
    if (board[1] === peice && board[4] === peice && board[7] === peice) {
      trackWins(peice);
      return `${peice} wins`;
    }
    if (board[2] === peice && board[5] === peice && board[8] === peice) {
      trackWins(peice);
      return `${peice} wins`;
    }

    //diagonals
    if (board[0] === peice && board[4] === peice && board[8] === peice) {
      trackWins(peice);
      return `${peice} wins`;
    }
    if (board[2] === peice && board[4] === peice && board[6] === peice) {
      trackWins(peice);
      return `${peice} wins`;
    }

    if (plays === 9) {
      winTracker.ties++;
      return "no winner";
    }

    return "";
  };

  return {
    markBoard,
    getBoard,
    determineTurn,
    checkForWinner,
    resetBoard,
    getWinTracker,
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

    backBtn.addEventListener("click", () => {
      //we need to do this to clear the eventlisteners for when the player vs player btn is clicked after going back to startpage
      const iconSelection = document.querySelector(".icon-selection");
      const newIconSelection = iconSelection.cloneNode(true);
      choosePieceScreen.replaceChild(newIconSelection, iconSelection);

      showStartScreen();
    });

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
    updatePieceOnStatsHeader();

    const gridSquares = document.querySelectorAll(".grid-square");
    gridSquares.forEach((square, index) => {
      square.id = index;

      square.addEventListener("click", () => {
        addPieceToScreen(square);
        updateTurnOnScreen();
        updateIfWinnerOnscreen(gridSquares);
      });

      square.addEventListener("mouseover", () => {
        setHover(square);
      });
    });

    document.querySelector("#resetBtn").addEventListener("click", () => {
      GameBoard.resetBoard();
      clearGameBoardOnScreen(gridSquares);
    });

    document.querySelector("#quitBtn").addEventListener("click", () => {
      location.reload();
    });
  };

  const setHover = (square) => {
    if (GameBoard.determineTurn() === "player one") {
      square.classList.add("grid-square-x");
      square.classList.remove("grid-square-o");
    } else {
      square.classList.add("grid-square-o");
      square.classList.remove("grid-square-x");
    }
  };

  const addPieceToScreen = (square) => {
    let marked = false;

    if (GameBoard.determineTurn() === "player one") {
      marked = GameBoard.markBoard(playerOne, square.id);
      if (marked) {
        square.style.backgroundColor = "lightgreen";
      }
    } else {
      marked = GameBoard.markBoard(playerTwo, square.id);
      if (marked) {
        square.style.backgroundColor = "rgb(157, 91, 219)";
      }
    }
    square.textContent = GameBoard.getBoard()[square.id];
  };

  const updateIfWinnerOnscreen = (gridSquares) => {
    let winner = "";
    let turn = GameBoard.determineTurn();
    const winTieObj = GameBoard.getWinTracker();

    turn === "player two"
      ? (winner = GameBoard.checkForWinner(playerOne.getPiece()))
      : (winner = GameBoard.checkForWinner(playerTwo.getPiece()));

    if (winner === "no winner") {
      document.querySelector("#ties").textContent = winTieObj.ties;
      document.querySelector("#turn").textContent = "Tie!";
      grayOutBoard(gridSquares);
      return;
    } else if (winner === "X wins" || winner === "O wins") {
      document.querySelector("#turn").textContent = winner;
      grayOutBoard(gridSquares);
      if (playerOne.getPiece() === "X") {
        document.querySelector("#playerOneWins").textContent = winTieObj.xWins;
        document.querySelector("#playerTwoWins").textContent = winTieObj.oWins;
        return;
      }
      document.querySelector("#playerOneWins").textContent = winTieObj.oWins;
      document.querySelector("#playerTwoWins").textContent = winTieObj.xWins;
    }
  };

  const grayOutBoard = (gridSquares) => {
    gridSquares.forEach((indvSquare) => {
      indvSquare.style.pointerEvents = "none";
      indvSquare.style.opacity = 0.7;
    });
  };

  const updateTurnOnScreen = () => {
    const turnHeader = document.querySelector("#turn");

    GameBoard.determineTurn() === "player one"
      ? (turnHeader.textContent = `Turn: ${playerOne.getPiece()}`)
      : (turnHeader.textContent = `Turn: ${playerTwo.getPiece()}`);
  };

  const setPlayers = (e) => {
    e.target.textContent === "X"
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

  const updatePieceOnStatsHeader = () => {
    document.querySelector(
      "#playerOneWinsHeader"
    ).textContent = `Player One Wins  (${playerOne.getPiece()})`;
    document.querySelector(
      "#playerTwoWinsHeader"
    ).textContent = `Player Two Wins  (${playerTwo.getPiece()})`;
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
