import axios from 'axios';
import { ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,

    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,

    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_RESET,
    NEW_PRODUCT_FAIL,
         
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,


    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    
    CLEAR_ERRORS } from '../constants/productConstants';



export const getProducts =(keyword='', currentPage = 1)=> async(dispatch)=> {
    try {
            dispatch({type : ALL_PRODUCTS_REQUEST})
            const {data} = await axios.get(`/products?keyword=${keyword}&page=${currentPage}`)
            dispatch({
                type : ALL_PRODUCTS_SUCCESS,
                payload : data
            })
    }
    catch(error){ 
          dispatch({
              type : ALL_PRODUCTS_FAIL,
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


export const newProduct = (name,price,description,stock,seller,images) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PRODUCT_REQUEST })

        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }

        const { data } = await axios.post(`/products/newproduct`, {name,price,description,stock,seller,images})

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log(error.error)
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}




export const getProductDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/products/${id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newReview = (rating,comment,productId) => async (dispatch) => {

    try {

        dispatch({ type: NEW_REVIEW_REQUEST })

        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }

        const { data } = await axios.put(`/products/review`,{rating,comment,productId} )
        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getAdminProducts = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_PRODUCTS_REQUEST })

        const { data } = await axios.get(`/products/admin/products`)

        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data.products
        })

    } catch (error) {

        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}
