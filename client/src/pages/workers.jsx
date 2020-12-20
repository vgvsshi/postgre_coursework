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
		<div className='main' >
			<div className='main-wrapper'>
				<div className='main-title'>Рабочие</div>

					<ul className="collection">
						<li><Link to='/admin/add-worker'>Добавить рабочего</Link></li>
					</ul>

					<ul style={{marginTop: '10px'}} className="collection">
						{workers.map((item, id) => {
							return (
								<li key={id} className="collection-item">{item.name}</li>
							)
						})}
					</ul>
			</div>
		</div>
	) : (null)
}