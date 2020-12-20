import React, { useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useAppState } from '../utils/innercontext';
import { useHistory } from "react-router-dom";
import { useAuth } from '../hooks/auth.hook';

export const Login = () => {
	const [form, setForm] = useState({ phone: "", password: "" })
	const {request, loading} = useHttp()
	const history = useHistory()
	const {login} = useAuth()

	const changeHadler = event => {
		setForm({ ...form, [event.target.name]: event.target.value })
	}

	const loginHandler = async (e) => {
		e.preventDefault()
		try{
			const response = await request(`/auth/login`, 'POST', { phone: form.phone, password: form.password })
			login(response.token)
			history.push('/')
		} catch(e){
			window.M.toast({ html: e })
		}
	}

	return (
		<div className='container'>
			<div className='center-align' style={{ paddingTop: '20px', fontSize: '30px' }}>
				Войти
			</div>

			<div className="input-field col s12">
				<input onChange={changeHadler} value={form.title} id="phone" name='phone' type="text" className="validate" />
				<label htmlFor="phone">Телефон</label>
			</div>
			<div className="input-field col s12">
				<input onChange={changeHadler} value={form.price} id="password" name='password' type="text" className="validate" />
				<label htmlFor="password">Пароль</label>
			</div>

			<div className='center-align' style={{ paddingTop: '20px' }}>
				<button onClick={e => loginHandler(e)} className={`waves-effect waves-light btn-large teal darken-3${loading || form.phone.length < 14 || form.password.length < 5 ? ' disabled' : ''}`}>Войти</button>
			</div>


		</div>
	)
}