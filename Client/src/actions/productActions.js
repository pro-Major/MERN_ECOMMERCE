import axios from 'axios';
import { ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
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

