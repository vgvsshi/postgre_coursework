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
			console.log('PRODUCTS', error.message)
		}
	}, [request])

	useEffect(() => {
		getAllProds()
	}, [])

	return (
		<div className='main'>
			<div className='main-wrapper'>
				<div className='main-title'>Продукты</div>
				<Link style={{ marginBottom: '20px' }} className='btn waves-effect waves-light teal darken-3' to='/admin/add-product'>Добавить товар</Link>

				<ul style={{ marginTop: '10px', width: '100%' }} className="collection">
					{products.map((item, id) => {
						return (
							<Link key={id} className="collection-item" to={{
								pathname: `/admin/change-product/${item.id}`,
								state: {
									id: item.id
								}
							}}>{item.name}</Link>
						)
					})}
				</ul>
			</div>
		</div>
	)
}