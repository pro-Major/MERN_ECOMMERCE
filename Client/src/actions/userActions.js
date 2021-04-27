import axios from 'axios';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_ERRORS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_RESET,

} from '../constants/userConstants';

//Login a User 
export const login = (email,password)=> async (dispatch) => {
    try {
        dispatch({type : LOGIN_REQUEST})
        const config={
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const{data} = await axios.post('/auth/loginUser',{email,password},config)
        dispatch({
            type : LOGIN_SUCCESS,
            payload: data.user
        })      
    }catch(error){
        dispatch({
            type : LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}
// Register user
export const register = (name,email,password) => async (dispatch) => {
    try {

        dispatch({ type: REGISTER_USER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('auth/registeruser', {name,email,password}, config)

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

//Load a User 
export const loadUser = () => async (dispatch) => {
    try {

        dispatch({ type: LOAD_USER_REQUEST })
            const { data } = await axios.get('auth/me')


        dispatch({
            type: LOAD_USER_SUCCESS,
            payload:data.user
        })

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}





//Logout A user 
export const logout = () => async(dispatch)=>{
 
      
    try{
        await axios.get('/auth/logout')

        dispatch({
            type:LOGOUT_SUCCESS,
        })
    }
    catch(error){
        dispatch({
            type : LOGOUT_FAIL,
            payload: error.response.error.message
        })
    
}
}

// Update profile
export const updateProfile = (userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PROFILE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put('/auth/me/update',userData, config)

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}

//CLear Errors 
export const clearErrors = () => async (dispatch)=> {
    dispatch({
        type: CLEAR_ERRORS
    })
}