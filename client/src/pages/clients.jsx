import React, { useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useAppState } from '../utils/innercontext'
import { Link } from "react-router-dom";
import { useAuth } from '../hooks/auth.hook';

export const Clients = () => {

	const [users, setUsers] = useState([])
	const { request, loading } = useHttp()
	const { state, dispatch } = useAppState()

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		if (state.token !== null) {
			const response = await request('/api/users', 'GET', null, { 'Authorization': 'Bearer ' + state.token })
			setUsers(response)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.token])

	return (
		<div className='main' >
			<div className='main-wrapper'>
				<div className='main-title'>Пользователи</div>
				{
					!loading ?
						<ul style={{ marginTop: '10px', width: '100%' }} className="collection">
							{users.map((item, id) => {
								return (
									<Link key={id} className="collection-item" to={{
										pathname: `/admin/change-user/${item.id}`,
										state: {
											id: item.id
										}
									}}>{item.name}</Link>
								)
							})}
						</ul>
						:
						<div className='main'>
							<div className="preloader-wrapper big active">
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
				}

			</div>
		</div>
	)
}