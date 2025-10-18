import Board from "./Board";
import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

function Game() {
  const [boardSize, setBoardSize] = useState(3);
  const [history, setHistory] = useState([
    { squares: Array(boardSize * boardSize).fill(null), location: null },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;
  const [isAscending, setIsAscending] = useState(true);

  function resetGamePlay(newSize) {
    setHistory([
      { squares: Array(newSize * newSize).fill(null), location: null },
    ]);
    setCurrentMove(0);
  }

  function handleBoardSizeChange(newSize) {
    setBoardSize(newSize);
    resetGamePlay(newSize);
  }

  function handlePlay(nextSquares) {
    const nextHistory = history.slice(0, currentMove + 1);
    const lastSquares = nextHistory[nextHistory.length - 1].squares;

    let moveLocation = null;
    for (let i = 0; i < nextSquares.length; i++) {
      if (lastSquares[i] !== nextSquares[i]) {
        moveLocation = {
          row: Math.floor(i / boardSize),
          col: i % boardSize,
        };
        break;
      }
    }

    const newHistoryEntry = { squares: nextSquares, location: moveLocation };
    setHistory([...nextHistory, newHistoryEntry]);
    setCurrentMove(nextHistory.length);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function handleSortToggle() {
    setIsAscending(!isAscending);
  }

  const moves = history.map((moveData, moveIndex) => {
    const isCurrentMove = moveIndex === currentMove;
    let description;

    if (moveIndex > 0) {
      const { row, col } = moveData.location;
      const index = row * boardSize + col;
      const player = moveData.squares[index];
      // Create a structured description instead of a long sentence
      description = (
        <>
          <span className="move-number">Move #{moveIndex}</span>
          <span className={`move-player ${player}`}>{player}</span>
          <span className="move-location">
            ({row + 1}, {col + 1})
          </span>
        </>
      );
    } else {
      description = <span className="move-number">Game Start</span>;
    }

    // Apply a 'current-move' class to the selected list item
    return (
      <li key={moveIndex} className={isCurrentMove ? "current-move" : ""}>
        <button onClick={() => jumpTo(moveIndex)} disabled={isCurrentMove}>
          {description}
        </button>
      </li>
    );
  });

  const sortedMoves = isAscending ? moves : moves.slice().reverse();

  const lastMoveLocation = history[currentMove].location;

  return (
    <div className="game">
      {/* Left Panel for Controls and History */}
      <div className="game-panel">
        <div className="game-settings">
          <FormControl
            fullWidth
            variant="outlined"
            className="board-size-select"
          >
            <InputLabel id="board-size-label">Board Size</InputLabel>
            <Select
              labelId="board-size-label"
              value={boardSize}
              label="Board Size" // This connects to the InputLabel
              onChange={(e) =>
                handleBoardSizeChange(parseInt(e.target.value, 10))
              }
            >
              {Array.from({ length: 8 }, (_, i) => i + 3).map((size) => (
                <MenuItem key={size} value={size}>
                  {size}x{size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <button
            className="reset-button"
            onClick={() => resetGamePlay(boardSize)}
          >
            Reset Game
          </button>
        </div>
        <div className="game-info">
          <div className="history-header">
            <h4>Move History</h4>
            <ToggleButton
              value="check"
              selected={!isAscending}
              onChange={handleSortToggle}
              size="small"
            >
              <SwapVertIcon />
            </ToggleButton>
          </div>
          <ol>{sortedMoves}</ol>
        </div>
      </div>

      {/* Right Area for the Board */}
      <div className="game-area">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          boardSize={boardSize}
          lastMoveLocation={lastMoveLocation}
        />
      </div>
    </div>
  );
}

export default Game;
