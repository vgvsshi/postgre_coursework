import React, { useState, useEffect, useCallback } from 'react'
import { useHttp } from '../hooks/http.hook'

export const AddWorker = () => {
	const [categories, setCategory] = useState(null)
	const { request, loading, error, clearError } = useHttp()
	const [form, setForm] = useState({ title: "", price: "", category: "", quantity: "" })

	const changeHadler = event => {
		setForm({ ...form, [event.target.name]: event.target.value })
	}

	const getAllCategories = useCallback(async () => {
		try {
			let allCategory = await request('/api/categories', 'GET', null)
			setCategory(allCategory)
		} catch (e) {
			console.log(e)
		}
	}, [request])

	const addHandler = async () => {
		try {
			await request('/api/products', 'POST', { ...form })
			window.M.toast({ html: `Товар добавлен` })
			setTimeout(()=> window.location.replace("http://localhost:3000/"), 800)
		} catch (e) { }
	}

	useEffect(() => {
		getAllCategories()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		window.M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'))
	}, [categories])

	useEffect(() => {
		if (error) {
			window.M.toast({ html: `${error}` })
			clearError()
		}
	}, [error, clearError])

	return categories ? (
		<div className='container'>
			<div className='center-align' style={{ paddingTop: '20px', fontSize: '30px' }}>
				Добавление товара
			</div>
			<div className="input-field col s12">
				<input onChange={changeHadler} value={form.title} id="title" name='title' type="text" className="validate" />
				<label htmlFor="title">Название</label>
			</div>
			<div className="input-field col s12">
				<input onChange={changeHadler} value={form.price} id="price" name='price' type="text" className="validate" />
				<label htmlFor="price">Цена</label>
			</div>
			<div className="input-field col s12">
				<input onChange={changeHadler} value={form.quantity} id="quantity" name='quantity' type="text" className="validate" />
				<label htmlFor="quantity">Количество</label>
			</div>
			<button className='dropdown-trigger btn teal darken-3' style={{ minWidth: '200px' }} data-target='dropdown1'>{form.category ? form.category : 'Выберите категорию'}</button>
			<ul id='dropdown1' className='dropdown-content'>
				{categories.map((item, id) => {
					return (
						<li onClick={() => { setForm({ ...form, category: item.name }) }} key={id}><a href="#!">{item.name}</a></li>
					)
				})}
			</ul>
			<div className='center-align' style={{ paddingTop: '20px' }}>
				<button onClick={addHandler} className={`waves-effect waves-light btn-large teal darken-3${loading || !(form.category && form.title && form.price && form.quantity) ? ' disabled' : ''}`}>Добавить продукт</button>
			</div>
		</div>
	) : (null)
}