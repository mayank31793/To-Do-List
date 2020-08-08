import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import './App.css';
import Home from './components/home';

function App() {
	return (
		<Router basename="https://zen-ramanujan-0a3491.netlify.app">
			<div className="App">
				<Home />
			</div>
		</Router>
	);
}

export default App;
