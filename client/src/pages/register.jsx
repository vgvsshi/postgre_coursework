import React, { useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useAppState } from '../utils/innercontext';
import { useHistory } from "react-router-dom";
export const Register = () => {

	const [form, setForm] = useState({ name: "", surname: "", phone: "", mail: "", password: "", company: "" })
	const {request, loading} = useHttp()
	const history = useHistory()
	const {dispatch} = useAppState()

	const changeHadler = event => {
		setForm({ ...form, [event.target.name]: event.target.value })
	}

	const loginHandler = async () => {
		const response = await request(`/auth/register`, 'POST', form).catch(err => window.M.toast({ html: err }))
		if(response.token){
			dispatch({type:'SET_TOKEN', payload: response.token})
			history.push('/')
		}
	}

	return (
		<div className='container'>
			<div className='center-align' style={{ paddingTop: '20px', fontSize: '30px' }}>
				Зарегестрироваться
			</div>

			<div className="input-field col s12">
				<input onChange={changeHadler} value={form.title} id="name" name='name' type="text" className="validate" />
				<label htmlFor="name">Имя</label>
			</div>
			<div className="input-field col s12">
				<input onChange={changeHadler} value={form.price} id="surname" name='surname' type="text" className="validate" />
				<label htmlFor="surname">Фамилия</label>
			</div>
			<div className="input-field col s12">
				<input onChange={changeHadler} value={form.title} id="phone" name='phone' type="text" className="validate" />
				<label htmlFor="phone">Телефон</label>
			</div>
			<div className="input-field col s12">
				<input onChange={changeHadler} value={form.price} id="mail" name='mail' type="text" className="validate" />
				<label htmlFor="mail">Почта</label>
			</div>
			<div className="input-field col s12">
				<input onChange={changeHadler} value={form.price} id="password" name='password' type="text" className="validate" />
				<label htmlFor="password">Пароль</label>
			</div>
			<div className="input-field col s12">
				<input onChange={changeHadler} id="company" value={form.company} type="tel" name='company' className="validate" />
				<label htmlFor="company">Компания (если Вы физическое лицо - оставьте поле пустым)</label>
			</div>

			<div className='center-align' style={{ paddingTop: '20px' }}>
				<button onClick={e => loginHandler()} className={`waves-effect waves-light btn-large teal darken-3${loading || form.phone.length < 14 || form.password.length < 5 ? ' disabled' : ''}`}>Зарегестрироваться</button>
			</div>


		</div>
	)
}