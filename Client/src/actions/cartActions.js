import axios from 'axios'
import { ADD_TO_CART_SUCCESS, ADD_TO_CART_REQUEST ,REMOVE_ITEM_CART , SAVE_SHIPPING_INFO} from '../constants/cartConstants'

export const addItemToCart = (id,quantity) => async (dispatch, getState) => { //getState gives current state
    dispatch({
        type: ADD_TO_CART_REQUEST,
    })
    const { data } = await axios.get(`/products/${id}`)
    
    
    dispatch({
        type: ADD_TO_CART_SUCCESS,
        payload: {    
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0],
            stock: data.product.stock,
            quantity
        }
    })
  
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeItemFromCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_ITEM_CART,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}
export const saveShippingInfo = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    })

    localStorage.setItem('shippingInfo', JSON.stringify(data))

}