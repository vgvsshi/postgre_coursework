import React, { useEffect, useState, useCallback } from 'react'
import { useHttp } from '../hooks/http.hook'
import '../styles/main.scss'
import { useAppState } from '../utils/innercontext'

export const Main = () => {
	const [products, setProducts] = useState([])
	const [cart, setCart] = useState([])
	const [orderPopUp, setOrderPopUp] = useState(false)
	const {state} = useAppState()
	const { request, loading } = useHttp()


	useEffect(() => {
		window.M.updateTextFields()
	}, [orderPopUp])

	const getAllProds = useCallback(async () => {
		try {
			let prods = await request(`/api/products`, 'GET', null)
			setProducts(prods)
		} catch (error) {
			console.log('MAIN', error.message)
		}
	}, [request])

	useEffect(() => {
		getAllProds()
	}, [])

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

	return products && !loading ? (
		<div className='main' >
			<div className='main-wrapper'>
				<div onClick={() => { console.log(cart) }} className='main-title'>Продукты</div>
				<div className='prod-list'>
					{products.map((item, id) => {
						return (
							<div key={id} className="prod-item">
								<div className='prod-title'>
									{item.name}
								</div>
								<div className='prod-category'>
									Категория: {item.name}
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
									{item.name} x {item.amount}
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
							<div className='btn-wrap'>
								<button onClick={() => { console.log({ token: state.token, products: [...cart], sum: totalPrice }) }} className='make-an-order'>
									Отправить заявку
								</button>
							</div>
						</div>
						:
						(null)
				}
			</div>
		</div>
	) :
		(
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
		)
}