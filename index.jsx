const { useState } = React;

export function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);


  const calculateWinner = (s) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let [a, b, c] of lines) {
      if (s[a] && s[a] === s[b] && s[a] === s[c]) return s[a];
    }
    return s.includes(null) ? null : 'Draw';
  };

  const winner = calculateWinner(squares);

  const handleClick = (i) => {
    if (squares[i] || winner) return; 
    const nextSquares = squares.slice();
    nextSquares[i] = isXNext ? 'X' : 'O';
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };


  const status = winner 
    ? (winner === 'Draw' ? "Draw" : `Winner: ${winner}`) 
    : `Next Player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>
      <div className="status">{status}</div>
      <div className="board">
        {squares.map((val, i) => (
          <button key={i} className="square" onClick={() => handleClick(i)}>
            {val}
          </button>
        ))}
      </div>
      <button id="reset" onClick={resetGame}>Reset Game</button>
    </div>
  );
}