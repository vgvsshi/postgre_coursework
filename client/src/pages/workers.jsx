import React, { useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useAppState } from '../utils/innercontext'
import { Link } from "react-router-dom";

export const Workers = () => {

	const [workers, setWorkers] = useState([])
	const { request } = useHttp()
	const { state } = useAppState()

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		const response = await request('/api/workers', 'GET', null, { 'Authorization': 'Bearer ' + state.token })
		setWorkers(response)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return workers.length !== 0 ?
		(
			<div className='main' >
				<div className='main-wrapper'>
					<div className='main-title'>Рабочие</div>

					<Link style={{ marginBottom: '20px' }} className='btn waves-effect waves-light teal darken-3' to='/admin/add-worker'>Добавить рабочего</Link>

					<ul style={{ marginTop: '10px', width: '100%' }} className="collection">
						{workers.map((item, id) => {
							return (
								<Link key={id} className="collection-item" to={{
									pathname: `/admin/change-worker/${item.id}`,
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