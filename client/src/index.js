import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { AppStateProvider } from './utils/innercontext';

ReactDOM.render(
	<AppStateProvider>
		<Router>
			<App />
		</Router>
	</AppStateProvider>,
	document.getElementById('root')
);


