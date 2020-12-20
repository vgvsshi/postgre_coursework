import React, { useState, useEffect, useCallback } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useAppState } from '../utils/innercontext'
import M from 'materialize-css'

export const ChangeUser = (props) => {
	const id = props.location.state.id
	const [user, setUser] = useState({ name: "", surname: "", phone: "", mail: "", type: "" })
	const { request } = useHttp()
	const { state } = useAppState()

	const changeHadler = event => {
		setUser({ ...user, type: event.target.value })
	}

	const getUser = useCallback(async () => {
		try {
			let testuser = await request(`/api/users/${id}`, 'GET', null, { 'Authorization': 'Bearer ' + state.token })
			setUser(testuser[0])
		} catch (e) {
			console.log('CHANGE_USER', e)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [request])

	const sendReqHandler = async () => {
		try {
			await request(`/api/users/${id}`, 'PATCH', { type: user.type }, { 'Authorization': 'Bearer ' + state.token }).catch(err => console.log(err))
			window.M.toast({ html: `Тип изменён` })
			// setTimeout(()=> window.location.replace("http://localhost:3000/"), 800)
		} catch (e) {
			console.log('CHANGE_USER 2', e);
		}
	}

	useEffect(() => {
		getUser()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		M.updateTextFields()
	}, [user])

	return user ? (
		<div className='container'>
			<div className='center-align' style={{ paddingTop: '20px', fontSize: '30px', marginBottom: '20px' }}>
				Изменить тип пользователя
			</div>


			<ul class="collection">
				<li class="collection-item">{user.name}</li>
				<li class="collection-item">{user.surname}</li>
				<li class="collection-item">{user.phone}</li>
				<li class="collection-item">{user.mail}</li>
				<li class="collection-item">{user.company}</li>
			</ul>

			<div className="input-field col s12" style={{ marginTop: '30px' }}>
				<input onChange={changeHadler} value={user.type} id="type" name='type' type="text" className="validate" />
				<label for="type">Введите тип пользователя</label>
			</div>

			<div className='center-align' style={{ paddingTop: '20px' }}>
				<button onClick={sendReqHandler} className={`waves-effect waves-light btn-large teal darken-3`}>Изменить</button>
			</div>

		</div>
	) : (null)
}