import React, { useState, useEffect, useCallback } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useAppState } from '../utils/innercontext'

export const ChangeProduct = ({ match }) => {

	window.M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'))

	const id = match.params.handle
	const [categories, setCategory] = useState(null)
	const [product, setProduct] = useState({ id: "", name: "", price: "", category_id: "", quantity: "" })
	const { request, error, clearError } = useHttp()
	const { state } = useAppState()

	const changeHadler = event => {
		let parsed = event.target.value
		if (!isNaN(parsed) && parsed.length !== 0) {
			parsed = parseInt(parsed)
		}
		setProduct({ ...product, [event.target.name]: parsed })
	}

	const getProduct = useCallback(async () => {
		try {
			let test = await request(`/api/products/${id}`, 'GET', null, { 'Authorization': 'Bearer ' + state.token })
			setProduct(test.rows[0])
		} catch (e) {
			console.log('CHANGE_PRODUCT 1', e)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [request])

	const sendReqHandler = async (e) => {
		try {
			await request(`/api/products/${id}`, 'PATCH', product, { 'Authorization': 'Bearer ' + state.token }).catch(err => console.log(err))
			window.M.toast({ html: `Продукт изменён` })
			setTimeout(() => window.location.replace("http://localhost:3000/admin/products"), 800)
		} catch (e) {
			console.log('CHANGE_PRODUCT 2', e);
		}
	}

	const getAllCategories = useCallback(async () => {
		try {
			let allCategories = await request('/api/categories', 'GET', null, { 'Authorization': 'Bearer ' + state.token })
			setCategory(allCategories)
		} catch (e) {
			console.log('CHANGE_PRODUCT 3', e)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [request])

	useEffect(() => {
		getAllCategories()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		console.log(product)
	}, [product])

	useEffect(() => {
		if (!categories) {
			getProduct()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categories])

	useEffect(() => {
		if (error) {
			window.M.toast({ html: `${error}` })
			clearError()
		}
	}, [error, clearError])

	return (
		product && categories ?
			<div className='container'>
				<div className='center-align' style={{ paddingTop: '20px', fontSize: '30px' }}>
					Изменения товара
			</div>
				<div className="input-field col s12">
					<h5>Название</h5>
					<input onChange={changeHadler} value={product.name} id="name" name='name' type="text" className="validate" />
				</div>
				<div className="input-field col s12">
					<h5>Цена</h5>
					<input onChange={changeHadler} value={product.price} id="price" name='price' type="text" className="validate" />
				</div>
				<div className="input-field col s12">
					<h5>Количество</h5>
					<input onChange={changeHadler} value={product.quantity} id="quantity" name='quantity' type="text" className="validate" />
				</div>
				<button className='dropdown-trigger btn teal darken-3' style={{ minWidth: '200px' }} data-target='dropdown1'>{product.category_id.length !== 0 ? categories.find(el => el.id === product.category_id).name : 'Выберите категорию'}</button>
				<ul id='dropdown1' className='dropdown-content'>
					{
						categories.map((item, id) => {
							return (
								<li onClick={() => { setProduct({ ...product, category_id: item.id }) }} key={id}><a href="#!">{item.name}</a></li>
							)
						})
					}
				</ul>
				<div className='center-align' style={{ paddingTop: '20px' }}>
					<button onClick={sendReqHandler} className={`waves-effect waves-light btn-large teal darken-3`}>Применить изменения</button>
				</div>
			</div> : (null)
	)
}