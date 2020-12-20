import React, { useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useAppState } from '../utils/innercontext'
import { Link } from "react-router-dom";
import { useAuth } from '../hooks/auth.hook';

export const Clients = () => {

	const [users, setUsers] = useState([])
	const {request, loading} = useHttp()
	const { state, dispatch } = useAppState()
	
	useEffect(async () => {
		if(state.token !== null){
			const response = await request('/api/users', 'GET', null, { 'Authorization': 'Bearer ' + state.token })
			setUsers(response)
		}
	}, [state.token])

	return (
		<div className='main' >
			<div className='main-wrapper'>
				<div className='main-title'>Пользователи</div>
					{
						!loading ?
							<ul style={{marginTop: '10px'}} className="collection">
								{users.map((item, id) => {
									return (
										<li key={id} className="collection-item"><Link to={{
											pathname: `/admin/change-user/${item.id}`,
											state: {
												id: item.id
											}
										}}>{item.name}</Link></li>
									)
								})}
							</ul> :
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