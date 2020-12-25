import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from "react-router-dom";
import { useAuth } from '../hooks/auth.hook';
import { useHttp } from '../hooks/http.hook'
import { useAppState } from '../utils/innercontext';

export const Header = () => {

	const [navContent, setNavContent] = useState()
	const { request } = useHttp()
	const history = useHistory()
	const location = useLocation()
	const { state } = useAppState()
	const { logout } = useAuth()

	useEffect(() => {
		getType()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.token])

	const getType = async () => {
		if (state.token !== null) {
			const response = await request(`/auth/check`, 'GET', null, { 'Authorization': 'Bearer ' + state.token })
			console.log(response);
			if (response.type === 'admin') {
				setNavContent(
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						<li><Link to='/admin/products'>Продукты</Link></li>
						<li><Link to='/admin/categories'>Категории</Link></li>
						<li><Link to='/admin/workers'>Рабочие</Link></li>
						<li><Link to='/admin/users'>Пользователи</Link></li>
						<li><Link to='/' onClick={e => logout()}>Выйти</Link></li>
					</ul>
				)
			} else if (response.type === 'manager') {
				setNavContent(
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						<li><Link to='/admin/products'>Продукты</Link></li>
						<li><Link to='/admin/categories'>Категории</Link></li>
						<li><Link to='/' onClick={e => logout()}>Выйти</Link></li>
					</ul>
				)
			} else if (response.type === 'client') {
				setNavContent(
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						<li><Link to='/' onClick={e => logout()}>Выйти</Link></li>
					</ul>
				)
			} else if (response.type === 'logout'){
				setNavContent(
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						<li><Link to='/login'>Войти</Link></li>
						<li><Link to='/register'>Зарегестрироваться</Link></li>
					</ul>
				)
			}
		} else {
			setNavContent(
				<ul id="nav-mobile" className="right hide-on-med-and-down">
					<li><Link to='/login'>Войти</Link></li>
					<li><Link to='/register'>Зарегестрироваться</Link></li>
				</ul>
			)
			if (location.pathname !== '/') {
				history.push('/')
			}
		}
	}

	return (
		<nav className='teal darken-3'>
			<div style={{ padding: '0 50px' }} className="nav-wrapper">
				<Link to='/' className="brand-logo">PostgreSQL</Link>
				{
					navContent
				}
			</div>
		</nav>
	)
}