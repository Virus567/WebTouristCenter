import {configureStore} from '@reduxjs/toolkit';
import {clientReducer} from './slices/clientSlice';

export const store = configureStore({
	reducer: {
		client: clientReducer
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// const regMiddleware = createListenerMiddleware()
// regMiddleware.startListening({
// 	actionCreator: RegisterSuccess,
// 	effect: (action => {
// 		store.dispatch(UpdateUser);
// 	})
// })
// const loginMiddleware = createListenerMiddleware()
// loginMiddleware.startListening({
// 	actionCreator: LoginSuccess,
// 	effect: (action => {
// 		store.dispatch(UpdateUser);
// 	})
// })

// export const store = configureStore({
// 	reducer: {
// 		client: clientReducer
// 	},
// 	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(regMiddleware.middleware).prepend(loginMiddleware.middleware)
// })

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch