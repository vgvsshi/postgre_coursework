import { useCallback, useEffect } from 'react'
import { useAppState } from '../utils/innercontext'

const storageName = 'token'

export const useAuth = () => {

	const { dispatch } = useAppState()

	const login = useCallback((jwtToken) => {
		dispatch({ type: "SET_TOKEN", payload: jwtToken })
		localStorage.setItem(storageName, JSON.stringify({ token: jwtToken }))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const logout = useCallback(() => {
		dispatch({ type: "LOGOUT" })
		localStorage.removeItem(storageName)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {

		const data = JSON.parse(localStorage.getItem(storageName))
		if (data && data.token) {
			login(data.token)
		}

	}, [login])


	return { login, logout }
}