import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
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
			console.log('PRODUCTS',error.message)
		}
	}, [request])

	useEffect(() => {
		getAllProds()
	}, [])
	
	return (
		<div>
			<h3>Продукты</h3>

			<ul className="collection">
				<li><Link to='/admin/add-product'>Добавить товар</Link></li>
			</ul>

			<ul style={{marginTop: '10px'}} className="collection">
				{products.map((item, id) => {
					return (
						<li key={id} className="collection-item">
							<Link to={{
								pathname: `/admin/change-product/${item.id}`,
								state: {
									id: item.id
								}
							}}>{item.name}</Link>
						</li>
					)
				})}
			</ul>
		</div>
	)
}