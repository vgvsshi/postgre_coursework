import React, { useEffect, useState } from 'react'

export const Main = () => {
	const [products, setProducts] = useState(null)

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		const data = await fetch('/api/products')

		const prods = await data.json()
		setProducts(prods)
	}, [])

	return products ? (
		<div onClick={() => { console.log(products) }}>Hello WOrld</div>
	) : (null)
}