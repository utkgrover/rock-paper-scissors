import React,{useState} from 'react';
import Navbar from './components/navbar';
import {Layout,Input,Button} from 'antd'
import './components/commonStyles.css'
import octoImage from './components/images/octopus.png';
import calculateWinner from './bot/calculateWinner';
import getBotMove,{bestSumMove} from './bot/bot';

const {Content} = Layout;

function checkMove(move){
    if ( move==='stone' || move==='paper' || move==='scissors') return true;
    else return false;
}

function botvbot(bot1,bot2){
    let scores = [0,0];
    let moves = [];

    //dummy moves
    for( let i=0;i<5;i++){
        const move1 = bot1(moves);
        const move2 = bot2(moves);

        if(checkMove(move1) && checkMove(move2)){
            moves.push({myBot:move1,opponent:move2});
        }
    }

    //20 real moves , if wrong move other player wins  , if both moves are wrong -1 to both 
    for( let i=0 ;i<20 ;i++){
        const move1 = bot1(moves);
        const move2 = bot2(moves);
        
        if(checkMove(move1) && checkMove(move2)){
            const winner = calculateWinner(move1,move2);
            if(winner === 'player'){
                scores[1]+=1;
                scores[0]-=1;
            } else if (winner === 'bot'){
                scores[0]+=1;
                scores[1]-=1;
            }
            moves.push({myBot:move1,opponent:move2});
        }else if(checkMove(move1)){
            scores[0]+=1;
            scores[1]-=1;
        }else if(checkMove(move2)){
            scores[1]+=1;
            scores[0]-=1;
        }else{
            scores[1]-=1;
            scores[0]-=1;
        }
    }

    return scores;
}

// function calculateScores(bots){
//     let scores = [0];
//     //for(let i=0 ;i<bots.length+1; i++) scores.push(0);
//     bots.forEach( item => scores.push(0));
//     const botFunction = bots.map( item => new Function('moves',item));

//     for(let i=0 ; i<bots.length ; i++){

//         const bot1 = new Function('moves',bots[i]);
//         let octomoves = [];//moves of input bot vs octo

//         for(let x=0 ; x<5 ; x++){
//             const move2 = bot1(octomoves);
//             const move1 = getBotMove(octomoves,'botFight');

//             if( checkMove(move1) && checkMove(move2)) octomoves.push({myBot:move1,opponent:move2});
//         }

//         for(let x=0 ; x<20 ; x++){
//             const move2 = bot1(octomoves);
//             const move1 = getBotMove(octomoves,'botFight');

//             //my bot will always make the correct move  
//             if( checkMove(move2)){
//                 octomoves.push({myBot:move1,opponent:move2});
//                 const winner = calculateWinner(move1,move2);

//                 if(winner === 'bot')scores[bots.length]+=1;
//                 if(winner === 'player')scores[i]+=1;
//             };
//         }


//         for(let j=i+1 ; j<bots.length ; j++){
//             let moves = [];

//             const bot2 = new Function('moves',bots[j]);

//             for(let x=0 ; x<5 ; x++){
//                 const move1 = bot1(moves);
//                 const move2 = bot2(moves);

//                 if( checkMove(move1) && checkMove(move2)) moves.push({myBot:move1,opponent:move2});
//             }

//             for(let x=0 ; x<20 ; x++){
//                 const move1 = bot1(moves);
//                 const move2 = bot2(moves);

//                 //if both make correct moves 
//                 if( checkMove(move1) && checkMove(move2)){
//                     moves.push({myBot:move1,opponent:move2});
//                     const winner = calculateWinner(move1,move2);

//                     if(winner === 'bot')scores[i]+=1;
//                     if(winner === 'player')scores[j]+=1;
//                 }else if( checkMove(move1)){
//                     scores[i]+=1;
//                 }else{
//                     scores[j]+=1;
//                 }
//             }
//         }

        
//     }

//     return scores;
// }

function calculateScoresDummy(bots){
    //try catch not working for bad functions 
    const botFunction = bots.map( item => new Function('moves',item));
    botFunction.push(bestSumMove);
    botFunction.push(getBotMove);

    let scores = [];
    botFunction.forEach( item => scores.push(0));
    
    for( let i=0 ;i< botFunction.length ; i++){
        for( let j=i+1; j<botFunction.length ; j++){
            const roundScores = botvbot(botFunction[i],botFunction[j]);
            scores[i]+=roundScores[0];
            scores[j]+=roundScores[1];
        }
    }

    return scores;
}

const Score = React.memo(({bots}) => {

    const scores = calculateScoresDummy(bots);
    const sumMove = scores.pop();
    const sageScore = scores.pop();

    return (
        <div className="full-width" style={{margin:"15px",padding:"15px"}}>
            <p></p>
            {
            scores.map( (item,index) => <p key={index+1}>Bot{index+1} has score = {item}</p>)
            }
            <p>Sage Octopus has score = {sageScore}</p>
            <p>BestSumMove has score = {sumMove}</p>     
        </div>
    );
});

function BotFight(){
    const [input,setInput] = useState("");
    const [bots,setBots] = useState([]);

    const submitBot = bot => {
        const botsCopy = [...bots];
        botsCopy.push(bot);
        setBots(botsCopy);
    }

    return (
        <Layout className="main-layout">
            <Navbar />
            <Content>
                <div className="half-container">
                    <div className="full-width">
                        <img src={octoImage} alt="Octo" className="octoimage"/>
                    </div>
                    <div className="full-width">
                        <p className="octopara">
                            Ahh now you want to bring bots to defeat me . Bring them onnn!  
                        </p>
                        <p className="octopara">
                            I'll smash your stupid bots right back to where they belong ...  
                        </p>
                    </div> 
                </div>
                <div className="half-container">
                    <div className="full-width">
                        <div className="half-width">
                            <Input 
                                placeholder="Enter Bot"
                                value={input}
                                onChange={e=> setInput(e.target.value)}
                            />
                        </div>
                        <div className="quarter-width">
                           <Button onClick={ () => {
                               setInput("");
                               setBots([]);
                            }} danger type="primary">Reset All Bots</Button> 
                        </div>
                        <div className="quarter-width">
                           <Button onClick={()=>{
                               submitBot(input);
                               setInput("");
                            }} type="primary">Submit</Button> 
                        </div>
                    </div>
                    {bots?<Score bots={bots} />:""}
                </div>
            </Content>
        </Layout>
    );
}

export default BotFight;