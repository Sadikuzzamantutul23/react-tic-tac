import { useState } from "react";

 /*  Game
 -> Board
 -> Square
 -> Histroy
 */
  function Square({value,onSquareClick}){
    

    
    return (
      <button className=" bg-white border border-gray-400 h-12 w-12 m-1
       leading-9 text-lg"
       onClick={onSquareClick}>
       {value}</button>
    );
  }

 function Board({xIsnext, square,onPlay}) {

 

    const winner =calculateWinner(square);
    let status;
    if(winner){
     status =`Winner: ${winner}`;
  }else{
    status ="Next Player:" + (xIsnext ? "X" : "O");
  }
   
     function handleClick(i){
      if(square[i] || calculateWinner(square)){
        return;
      }
        const nextSquare = square.slice();
        if(xIsnext){
          nextSquare[i] ="X";
        } else{
          nextSquare[i]='O';
        }
        onPlay(nextSquare);
     
     }
  return (
  <>
    <div className="text-blod">{status}</div>
  <div className="flex">
<Square value={square[0]} onSquareClick={() => handleClick(0)} />
<Square value={square[1]} onSquareClick={() => handleClick(1)} />
<Square value={square[2]} onSquareClick={() => handleClick(2)} />
  </div>
   <div className="flex">
      <Square value={square[3]}  onSquareClick={() => handleClick(3)}/>
      <Square value={square[4]}  onSquareClick={() => handleClick(4)}/>
      <Square value={square[5]}  onSquareClick={() => handleClick(5)}/>
  </div>
   <div className="flex">
     <Square value={square[6]}  onSquareClick={() => handleClick(6)}/>
     <Square value={square[7]}  onSquareClick={() => handleClick(7)}/>
     <Square value={square[8]}  onSquareClick={() => handleClick(8)}/> 
  </div>
  </>
  );
}
  export default function Game(){
    const [history, setHistory] =useState([Array(9).fill(null)]);
   const [xIsnext, setXisnext] = useState(true);
   const [currenntMove, setCurrentMove] = useState(0);

    const currenSquares = history[history.length -1];

     function handlePlay (nextSquare){
            setXisnext(!xIsnext);
            const nexHistory =[...history.slice(0, currenntMove + 1),nextSquare]
            setHistory(nexHistory);
            setCurrentMove(nexHistory.length -1);
     }

     function jumpTo(move){
      setCurrentMove(move);
      setXisnext(move % 2 === 0); 
     }

      const moves = history.map((square, move)=> {
        let description;
        if(move >0){
          description =`Go to the move # ${move}`;
        } else{
          description = `Go to strat the game`;
        }
         return(
          <li key={move}
          className="bg-gray-500 text-white mb-1 p-1">
            <button onClick={() =>jumpTo(move)}>{description}</button>
          </li>
         )
      }) 

    return(
      <div className="flex justify-center p-4">
        <div className="mr-14">
          <Board xIsnext={xIsnext}
          square={currenSquares}
          onPlay={handlePlay}
          />
        </div>
        <div>
          <ol className="border border-gray-400 p-1">{moves}</ol>
        </div>
      </div>
    )
  }

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}




