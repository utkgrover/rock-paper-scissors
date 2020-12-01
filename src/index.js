import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import HomePage from './pages/homePage';
import SinglePlayer from './pages/singlePlayer';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import BotFight from './pages/botFight';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path='/' render={() => <HomePage/>} />
        <Route exact path='/singlePlayer' render={() => <SinglePlayer/>} />
        <Route exact path='/botFight' render={() => <BotFight/>} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


/*

*/