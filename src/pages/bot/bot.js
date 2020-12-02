export default function getBotMove(previousMoves,str){
    const moves = ['stone','paper','scissors'];

    const mymove = moves[Math.floor(Math.random()*3)];
    if(str!=='botFight' && str){
        console.log(`bot called , bot move is ${mymove} called at ${str}`); 
    }

    return mymove;
}