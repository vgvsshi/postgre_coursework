import React from 'react'
import { Header } from './components/header'
import { Switch, Route } from "react-router-dom";
import { Main } from './pages/main'
import { Workers } from './pages/workers'
import { Clients } from './pages/clients'
import { AddCategory } from './pages/add-category'
import { AddProd } from './pages/add-prod'
import { Products } from './pages/products';
import { Categories } from './pages/categories';
import { AddWorker } from './pages/add-worker';
import { Register } from './pages/register';
import 'materialize-css'
import { Login } from './pages/login';
import { ChangeUser } from './pages/change-user';
import { ChangeProduct } from './pages/change-product';
import { ChangeCategory } from './pages/change-category';
import { ChangeWorker } from './pages/change-worker';

function App() {
	return (
		<React.Fragment>
			<Header />
			<Switch>
				<Route path="/" exact>
					<Main />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/register">
					<Register />
				</Route>
				<Route path="/admin/users">
					<Clients />
				</Route>
				<Route path="/admin/change-user/:handle" component={ChangeUser} />
				<Route path="/admin/products">
					<Products />
				</Route>
				<Route path="/admin/add-product">
					<AddProd />
				</Route>
				<Route path="/admin/change-product/:handle" component={ChangeProduct} />
				<Route path="/admin/categories">
					<Categories />
				</Route>
				<Route path="/admin/change-category/:handle" component={ChangeCategory} />
				<Route path="/admin/change-worker/:handle" component={ChangeWorker} />
				<Route path="/admin/add-category">
					<AddCategory />
				</Route>
				<Route path="/admin/workers">
					<Workers />
				</Route>
				<Route path="/admin/add-worker">
					<AddWorker />
				</Route>
			</Switch>
		</React.Fragment>
	);
}

export default App;
