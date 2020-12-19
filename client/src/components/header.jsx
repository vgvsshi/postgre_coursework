import React from 'react'
import { Link } from "react-router-dom";

export const Header = () => {
	return (
		<nav className='teal darken-3'>
			<div style={{ padding: '0 50px' }} className="nav-wrapper">
				<Link to='/' className="brand-logo">PostgreSQL</Link>
				<ul id="nav-mobile" className="right hide-on-med-and-down">
					<li><Link to='/add-prod'>Добавить товар</Link></li>
					<li><Link to='/add-category'>Добавить категорию</Link></li>
					<li><Link to='/'>Продукты</Link></li>
					<li><Link to='/workers'>Рабочие</Link></li>
					<li><Link to='/clients'>Пользователи</Link></li>
				</ul>
			</div>
		</nav >
	)
}