export default function getBotMove(previousMoves,str){
    const moves = ['stone','paper','scissors'];

    const mymove = moves[Math.floor(Math.random()*3)];
    console.log(`bot called , bot move is ${mymove} called at ${str}`); 

    return mymove;
}