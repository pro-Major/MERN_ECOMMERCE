import { ADD_TO_CART_SUCCESS , REMOVE_ITEM_CART , SAVE_SHIPPING_INFO} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [], shippingInfo: {}  }, action) => {
    switch (action.type) {

        case ADD_TO_CART_SUCCESS:
            const item = action.payload;
        
            const isItemExist = state.cartItems.find(i => i.product === item.product) //checks if that item exist or not

            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.product === isItemExist.product ? item : i)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case REMOVE_ITEM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(i => i.product !== action.payload)
            }


        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            }
         

        default:
            return state
    }
}