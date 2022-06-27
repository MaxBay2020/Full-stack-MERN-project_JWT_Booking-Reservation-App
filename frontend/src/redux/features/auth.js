import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    // 初始值来自于localStorage，如果localStorage里存着用户信息，则使用；如果没有则设置为null, false和null
    value: {
        user: JSON.parse(localStorage.getItem('user'))?.user || null,
        loading: false,
        error: null
    }
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (user, action)=>{
            user.value = {
                user: null,
                loading: true,
                error: null
            }
        },

        loginSuccess: (user,action)=>{
            user.value = {
                user: action.payload,
                loading: false,
                error: null
            }
            // 将登录信息存在localStorage中
            localStorage.setItem('user', JSON.stringify(user.value))
        },

        loginFailure: (user, action) => {
            user.value = {
                user: null,
                loading: false,
                error: action.payload
            }
        },

        logout: (user, action)=>{
            user.value = initialState
        }
    }
})


export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout
} = authSlice.actions


export default authSlice.reducer
