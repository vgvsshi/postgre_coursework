import React, { createContext, useReducer, useContext } from 'react'

const appData = {
	cartItems: [],
	token: null
}

const AppStateContext = createContext()

const appStateReducer = (state, action) => {
	
	switch (action.type) {

		case "SET_TOKEN": {
			return {
				...state,
				token: action.payload
			}
		}

		case "LOGOUT": {
			return {
				...state,
				token: null
			}
		}

		default: {
			console.log('test');
			return state
		}

	}
}

export const AppStateProvider = ({ children }) => {

	const [state, dispatch] = useReducer(appStateReducer, appData)

	return (
		<AppStateContext.Provider value={{ state, dispatch }}>
			{children}
		</AppStateContext.Provider>
	)
}

export const useAppState = () => {
	return useContext(AppStateContext)
}