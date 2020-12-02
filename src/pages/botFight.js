import React,{useState} from 'react';
import Navbar from './components/navbar';
import {Layout,Input,Button} from 'antd'
import './components/commonStyles.css'
import octoImage from './components/images/octopus.png';
import calculateWinner from './bot/calculateWinner';
import getBotMove from './bot/bot';

const {Content} = Layout;

function checkMove(move){
    if ( move==='stone' || move==='paper' || move==='scissors') return true;
    else return false;
}

function calculateScores(bots){
    let scores = [];
    for(let i=0 ;i<bots.length+1; i++) scores.push(0);

    for(let i=0 ; i<bots.length ; i++){

        const bot1 = new Function('moves',bots[i]);
        let octomoves = [];//moves of input bot vs octo

        for(let x=0 ; x<5 ; x++){
            const move2 = bot1(octomoves);
            const move1 = getBotMove(octomoves);

            if( checkMove(move1) && checkMove(move2)) octomoves.push({myBot:move1,opponent:move2});
        }

        for(let x=0 ; x<20 ; x++){
            const move2 = bot1(octomoves);
            const move1 = getBotMove(octomoves);

            //my bot will always make the correct move  
            if( checkMove(move2)){
                octomoves.push({myBot:move1,opponent:move2});
                const winner = calculateWinner(move1,move2);

                if(winner === 'bot')scores[bots.length]+=1;
                if(winner === 'player')scores[i]+=1;
            };
        }


        for(let j=i+1 ; j<bots.length ; j++){
            let moves = [];

            const bot2 = new Function('moves',bots[j]);

            for(let x=0 ; x<5 ; x++){
                const move1 = bot1(moves);
                const move2 = bot2(moves);

                if( checkMove(move1) && checkMove(move2)) moves.push({myBot:move1,opponent:move2});
            }

            for(let x=0 ; x<20 ; x++){
                const move1 = bot1(moves);
                const move2 = bot2(moves);

                //if both make correct moves 
                if( checkMove(move1) && checkMove(move2)){
                    moves.push({myBot:move1,opponent:move2});
                    const winner = calculateWinner(move1,move2);

                    if(winner === 'bot')scores[i]+=1;
                    if(winner === 'player')scores[j]+=1;
                }else if( checkMove(move1)){
                    scores[i]+=1;
                }else{
                    scores[j]+=1;
                }
            }
        }

        
    }

    return scores;
}

function Score({bots}){

    const scores = calculateScores(bots);

    return (
        <div className="full-width" style={{margin:"15px",padding:"15px"}}>
            {scores.map( (item,index) => <p>Bot{index+1} has score - {item}</p>)}
            {<p>Sage Octopus has score - {scores[scores.length-1]}</p>}
        </div>
    );
}

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
                               submitBot(input);
                               setInput("");
                            }} danger type="primary">Reset All Bots</Button> 
                        </div>
                        <div className="quarter-width">
                           <Button onClick={()=>{
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