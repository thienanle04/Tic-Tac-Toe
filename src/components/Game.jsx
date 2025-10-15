import Board from "./Board";
import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import SwapVertIcon from "@mui/icons-material/SwapVert";

function Game() {
  const [boardSize, setBoardSize] = useState(3);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [isAscending, setIsAscending] = useState(true);

  function handleBoardSizeChange(newSize) {
    setBoardSize(newSize);
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function handleSortToggle() {
    setIsAscending(!isAscending);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        {/* If the current list item is the move we are on, show text. Otherwise, show a button. */}
        {move === currentMove ? (
          <span>You are at move #{move}</span>
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    );
  });

  // Conditionally sort the moves based on the state
  const sortedMoves = isAscending ? moves : moves.slice().reverse();

  return (
    <div className="game">
      {/* --- UPDATED: Replaced buttons with a select dropdown --- */}
      <div className="game-settings">
        <h4>Select Board Size:</h4>
        <select
          value={boardSize}
          onChange={(e) => handleBoardSizeChange(parseInt(e.target.value, 10))}
        >
          <option value="3">3x3</option>
          <option value="4">4x4</option>
          <option value="5">5x5</option>
          <option value="6">6x6</option>
        </select>
      </div>
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          boardSize={boardSize}
        />
      </div>
      <div className="game-info">
        <ToggleButton
          selected={isAscending} // Control the visual 'selected' state
          onChange={handleSortToggle}
        >
          <SwapVertIcon />
        </ToggleButton>
        <ol>{sortedMoves}</ol>
      </div>
    </div>
  );
}

export default Game;
