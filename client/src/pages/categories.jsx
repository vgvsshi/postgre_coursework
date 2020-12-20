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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [request])

	useEffect(() => {
		getAllCategories()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		!loading ?
			<div className='main'>
				<div className='main-wrapper'>
					<div className='main-title'>Категории</div>

					<Link style={{ marginBottom: '20px' }} className='btn waves-effect waves-light teal darken-3' to='/admin/add-category'>Добавить категорию</Link>

					<ul style={{ marginTop: '10px', width: '100%' }} className="collection">
						{categories.map((item, id) => {
							return (
								<Link key={id} className="collection-item" to={{
									pathname: `/admin/change-category/${item.id}`,
									state: {
										id: item.id
									}
								}}>{item.name}</Link>
							)
						})}
					</ul>
				</div>
			</div >
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
	)
}