import React, { useState, useEffect, useCallback } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useAppState } from '../utils/innercontext'

export const Categories = () => {
	const [products, setProducts] = useState([])
	const { request, loading } = useHttp()
	const { state } = useAppState()
	
	const getAllCategories = useCallback(async () => {
		try {
			let prods = await request(`/api/categories`, 'GET', null, { 'Authorization': 'Bearer ' + state.token })
			setProducts(prods)
		} catch (error) {
			console.log(error.message)
		}
	}, [request])

	useEffect(() => {
		getAllCategories()
	}, [])

	return (
		!loading ?
		<div>
			{products.map((item, id) => {
				return (
					<div key={id} >
						<div>
							{item.name}
						</div>
					</div>
				)
			})}
		</div> :
		<div>Загрузка...</div>
	)
}