import React, { useState, useEffect, useCallback } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useAppState } from '../utils/innercontext'
import { useHistory } from 'react-router-dom'


export const ChangeWorker = ({match}) => {

	const id = match.params.handle
	const [worker, setWorker] = useState({id: "", name: "", surname: "", salary: 0, profession: ''})
	const { request, error, clearError } = useHttp()
	const { state } = useAppState()
	const history = useHistory()

	const changeHadler = event => {
		let parsed = event.target.value
		if(!isNaN(parsed) && parsed.length != 0){
			parsed = parseInt(parsed)
		}
		setWorker({ ...worker, [event.target.name]: parsed })
	}

	const getWorker = useCallback(async () => {
		try {
			let test = await request(`/api/workers/${id}`, 'GET', null, { 'Authorization': 'Bearer ' + state.token })
			setWorker(test.rows[0])
		} catch (e) {
			console.log('CHANGE_PRODUCT 1', e)
		}
	}, [request])

	const sendReqHandler = async (e) => {
		try {
			await request(`/api/workers/${id}`, 'PATCH', worker, { 'Authorization': 'Bearer ' + state.token }).catch(err => console.log(err))
			window.M.toast({ html: `Рабочий изменён` })
			setTimeout(()=> history.push('/'), 800)
		} catch (e) {
			console.log('CHANGE_PRODUCT 2', e);
	  }
	}


	useEffect(()=>{
		getWorker()
	}, [])

	useEffect(()=>{
		console.log(worker)
	}, [worker])

	useEffect(() => {
		if (error) {
			window.M.toast({ html: `${error}` })
			clearError()
		}
	}, [error, clearError])

	return (
		worker ?
		<div className='container'>
			<div className='center-align' style={{ paddingTop: '20px', fontSize: '30px' }}>
				Изменения товара
			</div>
			<div className="input-field col s12">
				<h5>Имя</h5>
				<input onChange={changeHadler} value={worker.name} id="name" name='name' type="text" className="validate" />
			</div>
			<div className="input-field col s12">
				<h5>Фамилия</h5>
				<input onChange={changeHadler} value={worker.surname} id="surname" name='surname' type="text" className="validate" />
			</div>
			<div className="input-field col s12">
				<h5>Зарплата</h5>
				<input onChange={changeHadler} value={worker.salary} id="salary" name='salary' type="text" className="validate" />
			</div>
			<div className="input-field col s12">
				<h5>Должность</h5>
				<input onChange={changeHadler} value={worker.profession} id="profession" name='profession' type="text" className="validate" />
			</div>
			
			<div className='center-align' style={{ paddingTop: '20px' }}>
				<button onClick={sendReqHandler} className={`waves-effect waves-light btn-large teal darken-3`}>Применить изменения</button>
			</div>
		</div> : (null)
	)
}