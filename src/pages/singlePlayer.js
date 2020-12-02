import React,{useState} from 'react';
import Navbar from './components/navbar';
import {Layout,Input,Button} from 'antd'
import './components/commonStyles.css'
import octoImage from './components/images/octopus.png';
import stoneImage from './components/images/stone.png';
import paperImage from './components/images/paper.jpeg';
import scissorsImage from './components/images/scissorsNew.jpg';
import getBotMove from './bot/bot'; 
import calculateWinner from './bot/calculateWinner';

const {Content} = Layout;

function PlayerMenu({moves,setMoves,updateScore}){
    //gives a different move when pushed inside
    //const botMove = getBotMove(moves,"useState");
    //console.log("outside botmove",botMove);

    const onPlay = (playerMove) => {
        const botMove = getBotMove(moves,"onPlay");

        const movesCopy = [...moves];
        movesCopy.push({myBot:botMove, opponent:playerMove});
        setMoves(movesCopy);

        const winner = calculateWinner(botMove , playerMove);
        updateScore(winner);
    }

    return (
        <div className="player-menu">
            <div className="sps-div">
                <div className="full-width" onClick={()=>{onPlay('stone')}} >
                    <img src={stoneImage} alt="Stone" className="sps-image" />
                </div>
                <div className="full-width">STONE</div>
            </div>
            <div className="sps-div">
                <div className="full-width" onClick={()=>{onPlay('paper')}}>
                    <img src={paperImage} alt="Paper" className="sps-image" />
                </div>
                <div className="full-width">PAPER</div>
            </div>
            <div className="scissors-div" >
                <div className="full-width" onClick={()=>{onPlay('scissors')}}>
                    <img src={scissorsImage} alt="Scissors" className="sps-image" />
                </div>
                <div className="full-width">SCISSORS</div>
            </div>
        </div>
    );
}

function MoveHistory({moves,player}){
    const sentences = [];
    moves.forEach( (item,index) => {
        let winner = calculateWinner(item.myBot,item.opponent);
        if(winner === 'bot') winner = 'Sage octo';
        if(winner === 'player') winner = player;

        sentences.push(`${index+1}. octo-${item.myBot}, player-${item.opponent} , winner-${winner}`);
    });

    return (
        <div className="full-width" style={{margin:"10px"}}>
            <p></p>
            {
                sentences.map( (i,index) => <p key={index}>{i}</p>)
            }
        </div>
    );
}

function SinglePlayer(){
    const [player,setPlayer] = useState("");
    const [inputDisabled,setInputDisabled] = useState(false);
    const [octoMessage,setOctoMessage] = useState("Enter your name to accept my challenge!");
    const [moves,setMoves] = useState([]);
    const [score,setScore] = useState([0,0]);//format bot,player

    const updateScore = winner => {
        if (winner === "tie") return ;
        
        const scoreCopy = [...score];
        if (winner === "bot"){
            scoreCopy[0]+=1;
        }else{
            scoreCopy[1]+=1;
        }

        setScore(scoreCopy);
        setOctoMessage(`score is ${scoreCopy[0]} - ${scoreCopy[1]}`);
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
                            So you are a lone ranger . Dont worry I'll go easy on you .  
                        </p>
                        <p className="octopara">
                            {octoMessage}    
                        </p>     
                    </div> 
                </div>
                <div className="half-container">
                    <div className="full-width">
                        <div className="half-width">
                            <Input 
                                placeholder="Enter your Name"
                                value={player}
                                onChange={e=> setPlayer(e.target.value)}
                                disabled={inputDisabled}
                            />
                        </div>
                        <div className="quarter-width">
                           <Button onClick={ () => {
                               setPlayer("");
                               setInputDisabled(false);
                               setOctoMessage("Enter your name to accept my challenge!");
                               setMoves([]);
                               setScore([0,0]);
                               }} danger type="primary">Reset</Button> 
                        </div>
                        <div className="quarter-width">
                           <Button onClick={()=>{
                               setInputDisabled(true);
                               setOctoMessage("Lets Play");
                            }} type="primary">Submit</Button> 
                        </div>
                    </div>
                    {inputDisabled?<PlayerMenu moves={moves} setMoves={setMoves} updateScore={updateScore} />:""}
                    {
                        inputDisabled?<MoveHistory moves={moves} player={player}/>:""
                    }
                </div>
            </Content>
        </Layout>
    );
}

export default SinglePlayer;