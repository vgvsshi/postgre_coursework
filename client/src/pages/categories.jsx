import React, { useState, useEffect, useCallback } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useAppState } from '../utils/innercontext'

export const Products = () => {
	const [products, setProducts] = useState([])
	const { request, loading } = useHttp()
	
	const getAllProds = useCallback(async () => {
		try {
			let prods = await request(`/api/products`, 'GET', null)
			setProducts(prods)
		} catch (error) {
			console.log(error.message)
		}
	}, [request])

	useEffect(() => {
		getAllProds()
	}, [])

	return (
		!loading ?
		<div>
			{products.map((item, id) => {
				return (
					<div key={id} >
						<div>
							{item.product_title}
						</div>
						<div>
							Категория: {item.category_title}
						</div>
						<div>
							Цена: {item.price} RUB
						</div>
					</div>
				)
			})}
		</div> :
		<div>Загрузка...</div>
	)
}