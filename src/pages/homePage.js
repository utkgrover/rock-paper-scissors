import {Layout,Button} from 'antd'
import 'antd/dist/antd.css';
import Navbar from './components/navbar';
import './components/commonStyles.css'
import React from 'react';
import octoImage from './components/images/octopus.png';

const {Content} = Layout;

//make both the divs span the entire page 
function Homepage(props){
    return (
        <Layout className="main-layout">
            <Navbar />
            <Content>
                <div className="welcome">
                    <div className="full-width">
                        <img src={octoImage} alt="Octo" className="octoimage"/>
                    </div>
                    <div className="full-width">
                        <p className="octopara">
                            Hey there , I am the Sage Octopus of Marina Trench . 
                            Meditating in those deep dark waters gave me stone paper scissors superpowers.
                            I trod seas and oceans looking for someone who could take me on.
                            Alas I found you here , my worthy opponent.    
                        </p>
                        <p className="octopara">
                            Select your option from top right to continue !!!    
                        </p>
                    </div> 
                </div>  
            </Content>
        </Layout>
    );
} 

export default Homepage;

/*
<div className="welcome">
    <p>Welcome to the game</p>
    <p>Select mode from top right to continue...</p>
</div>
*/