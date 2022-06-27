import { configureStore } from '@reduxjs/toolkit'
import searchReducer from '../features/search'
import authReducer from '../features/auth'

const store = configureStore({
    reducer: {
        search: searchReducer,
        auth: authReducer,
    },
    middleware: []
})

export default store
