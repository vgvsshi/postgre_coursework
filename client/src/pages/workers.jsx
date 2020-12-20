import React, { useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useAppState } from '../utils/innercontext'
import { Link } from "react-router-dom";

export const Workers = () => {

	const [workers, setWorkers] = useState([])
	const {request, loading} = useHttp()
	const {state, dispatch} = useAppState()
	
	useEffect(async () => {
		const response = await request('/api/workers', 'GET', null, { 'Authorization': 'Bearer ' + state.token })
		setWorkers(response)
	}, [])

	return workers ? (
		<div >
				<h3>Рабочие</h3>

					<ul className="collection">
						<li><Link to='/admin/add-worker'>Добавить рабочего</Link></li>
					</ul>

					<ul style={{marginTop: '10px'}} className="collection">
						{workers.map((item, id) => {
							return (
								<li key={id} className="collection-item">
									<Link to={{
										pathname: `/admin/change-worker/${item.id}`,
										state: {
											id: item.id
										}
									}}>{item.name}</Link>
								</li>
							)
						})}
					</ul>
		</div>
	) : (null)
}