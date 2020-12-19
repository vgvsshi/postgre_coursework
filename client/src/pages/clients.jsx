import React, { useEffect, useState } from 'react'

export const Clients = () => {
	const [user, setUser] = useState(null)

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		const response = await fetch('/api/clients')
		const data = await response.json()
		console.log(data);
		setUser(data)
	}, [])

	return user ? (
		<ul className="collection">
<<<<<<< Updated upstream
			{user.map((item, ind) => {
				return (
					<li key={ind} className="collection-item">{item.name}</li>
=======
			{user.map((item, id) => {
				return (
					<li key={id} className="collection-item">{item.name}</li>
>>>>>>> Stashed changes
				)
			})}
		</ul>
	) : (null)
}