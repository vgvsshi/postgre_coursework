import { Header } from './components/header'
import { Switch, Route } from "react-router-dom";
import { Main } from './pages/main'
import { Workers } from './pages/workers'
import { Clients } from './pages/clients'

import 'materialize-css'

function App() {
	return (
		<>
			<Header />
			<Switch>
				<Route path="/" exact>
					<Main />
				</Route>
				<Route path="/cars">
					<Workers />
				</Route>
				<Route path="/clients">
					<Clients />
				</Route>
			</Switch>
		</>
	);
}

export default App;
