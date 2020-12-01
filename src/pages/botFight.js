import React,{useState} from 'react';
import Navbar from './components/navbar';
import {Layout,Input,Button} from 'antd'
import './components/commonStyles.css'
import octoImage from './components/images/octopus.png';

const {Content} = Layout;

function BotFight(){
    const [input,setInput] = useState("");

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
                            I'll smash your stupid bots back to the ghettos .. right where they belong ...git  
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
                               }} danger type="primary">Reset All Bots</Button> 
                        </div>
                        <div className="quarter-width">
                           <Button onClick={()=>{
                               setInput("");
                            }} type="primary">Submit</Button> 
                        </div>
                    </div>
                </div>
            </Content>
        </Layout>
    );
}

export default BotFight;