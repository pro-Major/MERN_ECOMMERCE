import axios from 'axios';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,


    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,

    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,

    LOGOUT_SUCCESS,
    LOGOUT_FAIL,

    CLEAR_ERRORS,

    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,

    
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,

    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,

    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL, 

    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,

    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,


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
export const updateProfile = (name,email) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PROFILE_REQUEST })

        // const config = {
        //     headers: {
        //         'Content-Type': 'application.json'
        //     }
        // }

        const { data } = await axios.put('/auth/me/update',{name,email})

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

// Update password
export const updatePassword = (oldPassword,password) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PASSWORD_REQUEST })

        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }

        const { data } = await axios.put('/auth/password/update', {oldPassword,password})

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

// Forgot password
export const forgotPassword = (email) => async (dispatch) => {
    try {

        dispatch({ type: FORGOT_PASSWORD_REQUEST })

        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }

        const { data } = await axios.post('/auth/password/forgot',{email})

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}


// Reset password
export const resetPassword = (token,password,confirmpassword) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PASSWORD_REQUEST })

        

        const { data } = await axios.put(`/auth/password/reset/${token}`,{password,confirmpassword})

        dispatch({
            type: NEW_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}



// Get all users
export const allUsers = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_USERS_REQUEST })

        const { data } = await axios.get('/auth/admin/users')

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data.users
        })

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}



// Update user - ADMIN
export const updateUser = (id, name,email,role) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_USER_REQUEST })

        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }

        const { data } = await axios.put(`/auth/admin/user/${id}`, {name,email,role})

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}


// Delete user - ADMIN
export const deleteUser = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_USER_REQUEST })

        const { data } = await axios.delete(`/auth/admin/user/${id}`)

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}


// Get user details - ADMIN
export const getUserDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: USER_DETAILS_REQUEST })


        const { data } = await axios.get(`/auth/admin/user/${id}`)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
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

