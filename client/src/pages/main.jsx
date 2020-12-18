import React, { useEffect, useState } from 'react'
import '../styles/main.scss'

export const Main = () => {
	const [products, setProducts] = useState(null)

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		const data = await fetch('/api/products')

		const prods = await data.json()
		setProducts(prods)
	}, [])

	return products ? (
		<div className='main'>
			<div onClick={() => { console.log(products) }} className='main-wrapper'>
				<div className='prod-list'>
					{products.map((item, id) => {
						return (
							<div key={id} className="prod-item">
								<div className='prod-title'>
									{item.name}
								</div>
								<div className='prod-price'>
									{item.price}
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	) : (null)
}