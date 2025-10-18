function Square({ value, onSquareClick, isWinningSquare }) {
  // Add the player's value as a class if it's a winning square
  const className = `square ${isWinningSquare ? 'winner ' + value : ''}`;
  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default Square;