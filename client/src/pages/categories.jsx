import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { useAppState } from '../utils/innercontext'

export const Categories = () => {
	const [categories, setCategories] = useState([])
	const { request, loading } = useHttp()
	const { state } = useAppState()
	
	const getAllCategories = useCallback(async () => {
		try {
			let cats = await request(`/api/categories`, 'GET', null, { 'Authorization': 'Bearer ' + state.token })
			setCategories(cats)
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
			<h3>Категории</h3>
			
			<ul className="collection">
				<li><Link to='/admin/add-category'>Добавить категорию</Link></li>
			</ul>

			<ul style={{marginTop: '10px'}} className="collection">
				{categories.map((item, id) => {
					return (
						<li key={id} className="collection-item">
							<Link to={{
								pathname: `/admin/change-category/${item.id}`,
								state: {
									id: item.id
								}
							}}>{item.name}</Link>
						</li>
					)
				})}
			</ul>
		</div> :
		<div>Загрузка...</div>
	)
}