import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { useAppState } from '../utils/innercontext'

export const ChangeCategory = ({ match }) => {

	const id = match.params.handle
	const [form, setForm] = useState({ title: '', id: 1 })
	const { request, loading } = useHttp()
	const { state } = useAppState()
	const history = useHistory();

	const addHandler = async () => {
		try {
			const resp = await request(`/api/categories/${id}`, 'PATCH', form, { 'Authorization': 'Bearer ' + state.token })
			window.M.toast({ html: resp.message })
			setTimeout(() => {
				history.push('/')
			}, 800);
		} catch (e) { }
	}

	const getProduct = useCallback(async () => {
		try {
			console.log(id);
			let test = await request(`/api/categories/${id}`, 'GET', null, { 'Authorization': 'Bearer ' + state.token })
			setForm({ title: test.rows[0].name, id: test.rows[0].id })
		} catch (e) {
			console.log('CHANGE_PRODUCT 1', e)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [request])

	useEffect(() => {
		getProduct()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		console.log(form);
	}, [form])

	return (
		<div className='container'>
			<div className='center-align' style={{ paddingTop: '20px', fontSize: '30px' }}>
				Изменение категории
			</div>
			<div className="input-field col s12">
				<input onChange={(e) => { setForm({ ...form, title: e.target.value }) }} value={form.title} id="title" name='title' type="text" className="validate" />
				<label htmlFor="title">Название</label>
			</div>
			<div className='center-align'>
				<button onClick={addHandler} className={`waves-effect waves-light btn-large teal darken-3${loading || !form.title ? ' disabled' : ''}`}>Добавить категорию</button>
			</div>
		</div>
	)
}