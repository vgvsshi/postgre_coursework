import React, { useEffect, useState } from 'react'
import '../styles/main.scss'

export const Main = () => {
	const [products, setProducts] = useState(null)
	const [cart, setCart] = useState([])
	const [orderPopUp, setOrderPopUp] = useState(false)
	const [form, setForm] = useState({ name: "", surname: "", phone: "", email: "", company: false })

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		const data = await fetch('/api/products')

		const prods = await data.json()
		setProducts(prods)
	}, [])

	useEffect(() => {
		window.M.updateTextFields()
	}, [orderPopUp])

	const changeHadler = event => {
		setForm({ ...form, [event.target.name]: event.target.value })
	}

	const byField = (field) => {
		return (a, b) => a[field] > b[field] ? 1 : -1;
	}

	const addToCart = (id) => {
		const item = products.find(el => el.id === id)
		if (cart.findIndex((el) => el.id === item.id) !== -1) {
			const clone = cart.find((el) => el.id === item.id)
			const newCart = cart.filter((el) => el.id !== item.id)
			clone.amount = clone.amount + 1
			newCart.push(clone)
			setCart(newCart)
		}
		else {
			item.amount = 1
			setCart([...cart, item])
		}
	}

	const deleteFromCart = (id) => {
		setCart(cart.filter(item => item.id !== id))
	}

	let totalPrice = 0

	cart.map((item) => {
		return totalPrice = totalPrice + item.price * item.amount
	})

	return products ? (
		<div className='main' >
			<div className='main-wrapper'>
				<div onClick={() => { console.log(cart) }} className='main-title'>Продукты</div>
				<div className='prod-list'>
					{products.map((item, id) => {
						return (
							<div key={id} className="prod-item">
								<div className='prod-title'>
									{item.product_title}
								</div>
								<div className='prod-category'>
									Категория: {item.category_title}
								</div>
								<div className='prod-price'>
									Цена: {item.price} RUB
								</div>
								<button onClick={() => { addToCart(item.id) }} className='add-to-cart teal darken-3'>В корзину</button>
							</div>
						)
					})}
				</div>
				<div onClick={() => { console.log(cart) }} className='main-title'>Корзина</div>
				<div className='cart-list'>
					{cart.sort(byField("price")).map((item, id) => {
						return (
							<div key={id} className='cart-item'>
								<span className='cartItem-title'>
									{item.product_title} x {item.amount}
								</span>
								<span className='cartItem-price'>
									{item.price} RUB
								</span>
								<div onClick={() => { deleteFromCart(item.id) }} className='delete-from-cart'>&#10006;</div>
							</div>
						)
					})}
				</div>
				{
					cart.length !== 0 ?
						<button
							disabled={orderPopUp}
							className='order-btn'
							onClick={() => {
								setOrderPopUp(true)
								document.querySelector("body").classList.add("lock")
							}}>Сделать заказ</button> :
						(null)
				}
				{
					orderPopUp ?
						<div className='order-inner'>
							<div
								onClick={() => {
									setOrderPopUp(false)
									document.querySelector("body").classList.remove("lock")
								}}
								className='close-order'>
								&#10006;
							</div>
							<form>
								<div className="row">
									<div className="input-field col s12">
										<input onChange={changeHadler} id="name" value={form.name} name='name' type="text" className="validate" />
										<label htmlFor="name">Имя</label>
									</div>
									<div className="input-field col s12">
										<input onChange={changeHadler} id="surname" value={form.surname} name='surname' type="text" className="validate" />
										<label htmlFor="surname">Фамилия</label>
									</div>
									<div className="input-field col s12">
										<input onChange={changeHadler} id="email" value={form.email} name='email' type="email" className="validate" />
										<label htmlFor="email">Email</label>
									</div>
									<div className="input-field col s12">
										<input onChange={changeHadler} id="phone" value={form.phone} type="tel" name='phone' className="validate" />
										<label htmlFor="phone">Телефон</label>
									</div>
									<p>
										<label>
											<input
												className="with-gap"
												name="company"
												type="radio"
												checked={form.company === false}
												onChange={(e) => {
													setForm({ ...form, company: false })
												}} />
											<span>Физическое лицо</span>
										</label>
									</p>
									<p>
										<label>
											<input
												className="with-gap"
												name="company"
												type="radio"
												checked={form.company === true}
												onChange={(e) => {
													setForm({ ...form, company: true })
												}} />
											<span>Юридическое лицо</span>
										</label>
									</p>
									<div className='sum'>
										Сумма заказа: {totalPrice} RUB
									</div>
								</div>
							</form>
							<div className='btn-wrap'>
								<button disabled={!(form.name && form.surname && form.phone && form.email)} onClick={() => { console.log({ ...form, order: [...cart], sum: totalPrice }) }} className='make-an-order'>
									Отправить заявку
								</button>
							</div>
						</div>
						:
						(null)
				}
			</div>
		</div>
	) : (null)
}