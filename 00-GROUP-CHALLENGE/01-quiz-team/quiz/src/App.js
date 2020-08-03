import React from 'react';
<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
=======
import './css/App.css';
import { Route, Switch } from 'react-router-dom';
import PageNotFound from './components/PageNotFound'
import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import LeaderBoard from './components/LeaderBoard'
import LoginScreen from './components/LoginScreen'
import QuizComponent from './components/QuizComponent'
import Dashboard from './components/Dashboard'


function App() {
	return (
		<div className="app">
			<Header />
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/leaderboard" exact component={LeaderBoard} />
				<Route path="/dashboard" exact component={Dashboard} />
				<Route path="/login" exact component={LoginScreen} />
				<Route component={PageNotFound} />
			</Switch>
			<QuizComponent />
			<Footer />
		</div>
	);
>>>>>>> cdb3cb479413218b5813aa4782c7f3032221301f
}

export default App;
