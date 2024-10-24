import  {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name:'auth',
    initialState: {
        loading: false,
        isAuthenticated: false
    },
    reducers: {
        loginRequest(state, action){
           return {
            ...state,
            loading: true
           }
        },
        loginSuccess(state, action){
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        loginFail(state, action){
            return{
                ...state,
                loading:false,
                error: action.payload
            }
        },
        clearError(state, action){
            return{
                ...state,
                error: null
            }
        },
        registerRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        registerSuccess(state, action){
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        registerFail(state, action){
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        loadUserRequest(state, action){
            return {
                ...state,
                isAuthenticated:false,
                loading:true
            }
        },
        loadUserSuccess(state, action){
            return {
                loading: false,
                isAuthenticated: true,
                user:action.payload.user
            }
        },
        loadUserFail(state, action){
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        logoutSuccess(state, action){
            return {
                loading: false,
                isAuthenticated: false
            }
        },
        logoutFail(state, action){
            return {
                ...state,
                error:action.payload
            }
        }
    }
})

const {actions, reducer} = authSlice

export const {
    loginRequest, 
    loginSuccess, 
    loginFail, 
    clearError, 
    registerRequest, 
    registerSuccess, 
    registerFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logoutFail,
    logoutSuccess
} = actions

export default reducer