export default function getBotMove(previousMoves,str){
    const moves = ['stone','paper','scissors'];

    const mymove = moves[Math.floor(Math.random()*3)];
    if(str!=='botFight' && str){
        console.log(`bot called , bot move is ${mymove} called at ${str}`); 
    }

    return mymove;
}

function getBeatMove(move){
    if(move === 'scissors') return 'stone';
    if(move === 'stone') return 'paper';
    if(move === 'paper') return 'scissors';
}

export function bestSumMove(moves){
    const rps = [0,0,0];
    const rpsMap = ['stone','paper','scissors'];

    moves.forEach((item)=>{
        if(item.opponent === 'stone') rps[0]+=1;
        if(item.opponent === 'paper') rps[1]+=1;
        if(item.opponent === 'scissors') rps[2]+=1;
    });

    const expectedMove = Math.max(rps[0],rps[1],rps[2]);
    for( let i=0;i<3;i++){
        if( rps[i] === expectedMove ) return getBeatMove(rpsMap[i]);
    }

}