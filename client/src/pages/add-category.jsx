import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { useAppState } from '../utils/innercontext'

export const AddCategory = () => {
	const [title, setTitle] = useState('')
	const { request, loading, error, clearError } = useHttp()
	const {state} = useAppState()
	const history = useHistory();

	const addHandler = async () => {
		try {
			await request('/api/categories', 'POST', { title }, { 'Authorization': 'Bearer ' + state.token })
			window.M.toast({ html: `Категория добавлена` })
			setTimeout(() => {
				history.push('/')
			}, 800);
		} catch (e) { }
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
				Добавление категории
			</div>
			<div className="input-field col s12">
				<input onChange={(e) => { setTitle(e.target.value) }} value={title} id="title" name='title' type="text" className="validate" />
				<label htmlFor="title">Название</label>
			</div>
			<div className='center-align'>
				<button onClick={addHandler} className={`waves-effect waves-light btn-large teal darken-3${loading || !title ? ' disabled' : ''}`}>Добавить категорию</button>
			</div>
		</div>
	)
}