import React from 'react'
import { Link } from "react-router-dom";

export const Header = () => {
	return (
		<nav>
			<div style={{ padding: '0 50px' }} className="nav-wrapper">
				<Link to='/' className="brand-logo">PostgreSQL</Link>
				<ul id="nav-mobile" className="right hide-on-med-and-down">
					<li><Link to='/'>Заказы</Link></li>
					<li><Link to='/workers'>Рабочие</Link></li>
					<li><Link to='/clients'>Клиенты</Link></li>
					{/* <li><Link><a href="/">Машины</a></Link></li */}
				</ul>
			</div>
		</nav >
	)
}