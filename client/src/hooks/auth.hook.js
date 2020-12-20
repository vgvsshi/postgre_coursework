import { useState, useCallback, useEffect } from 'react'
import { useAppState } from '../utils/innercontext'

const storageName = 'token'

export const useAuth = () => {

	const {state, dispatch} = useAppState()

	const login = useCallback((jwtToken) => {
		dispatch({type: "SET_TOKEN", payload: jwtToken})
		localStorage.setItem(storageName, JSON.stringify({token: jwtToken}))
	}, [])

	const logout = useCallback(() => {
		dispatch({type: "LOGOUT"})
		localStorage.removeItem(storageName)
	}, [])

	useEffect(() => {
		
		const data = JSON.parse(localStorage.getItem(storageName))
		if (data && data.token) {
			login(data.token)
		}

	}, [login])


	return { login, logout }
}