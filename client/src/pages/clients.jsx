import React, { useEffect, useState } from 'react'

export const Clients = () => {
	const [user, setUser] = useState(null)


	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		const response = await fetch('/api/clients')

		const data = await response.json()
		console.log(data)
		setUser(data)
	}, [])

	return user ? (
		<ul class="collection">
			{user.map((item, id) => {
				return (
					<li class="collection-item">{user.name}</li>
				)
			})}
		</ul>
	) : (null)
}