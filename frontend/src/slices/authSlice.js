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
        }
    }
})

const {actions, reducer} = authSlice

export const {loginRequest, loginSuccess, loginFail} = actions

export default reducer