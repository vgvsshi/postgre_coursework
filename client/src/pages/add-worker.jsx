import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { useAppState } from '../utils/innercontext'

export const AddWorker = () => {

	const { request, loading, error, clearError } = useHttp()
	const [form, setForm] = useState({ name: "", surname: "", salary: "", profession: "" })
	const { state } = useAppState()
	const history = useHistory();

	const changeHadler = event => {
		setForm({ ...form, [event.target.name]: event.target.value })
	}

	const addHandler = async () => {
		try {
			const resp = await request('/api/workers', 'POST', { ...form }, { 'Authorization': 'Bearer ' + state.token })
			window.M.toast({ html: resp.message })
			setTimeout(()=> history.push('/'), 800)
		} catch (e) { 
			window.M.toast({html: e})
		}
	}

	useEffect(() => {
		if (error) {
			window.M.toast({ html: `${error}` })
			clearError()
		}
	}, [error, clearError])

	return (
		<div className='container'>
			<div className='center-align' style={{ paddingTop: '20px', fontSize: '30px' }}>
				Добавление рабочего
			</div>
			<div className="input-field col s12">
				<input onChange={changeHadler} value={form.name} id="name" name='name' type="text" className="validate" />
				<label htmlFor="name">Имя</label>
			</div>
			<div className="input-field col s12">
				<input onChange={changeHadler} value={form.surname} id="surname" name='surname' type="text" className="validate" />
				<label htmlFor="surname">Фамилия</label>
			</div>
			<div className="input-field col s12">
				<input onChange={changeHadler} value={form.salary} id="salary" name='salary' type="text" className="validate" />
				<label htmlFor="salary">Зарплата</label>
			</div>
			<div className="input-field col s12">
				<input onChange={changeHadler} value={form.profession} id="profession" name='profession' type="text" className="validate" />
				<label htmlFor="profession">Профессия</label>
			</div>
			
			<div className='center-align' style={{ paddingTop: '20px' }}>
				<button onClick={addHandler} className={`waves-effect waves-light btn-large teal darken-3$`}>Добавить рабочего</button>
			</div>

		</div>
	)
}