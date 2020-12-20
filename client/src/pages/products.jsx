import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'

export const Products = () => {
	const [products, setProducts] = useState([])
	const { request } = useHttp()

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return products.length !== 0 ?
		(
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
		:
		(
			<div className='main'>
				<div style={{ marginTop: '100px' }} className="preloader-wrapper big active">
					<div className="spinner-layer spinner-green-only">
						<div className="circle-clipper left">
							<div className="circle"></div>
						</div><div className="gap-patch">
							<div className="circle"></div>
						</div><div className="circle-clipper right">
							<div className="circle"></div>
						</div>
					</div>
				</div>
			</div>
		)
}