import axios from 'axios'
import { ADD_TO_CART} from '../constants/cartConstants'

export const addItemToCart = (id,quantity) => async (dispatch, getState) => { //getState gives current state
    
    const { data } = await axios.get(`products/${id}`)
    
    dispatch({
        type: ADD_TO_CART,
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
