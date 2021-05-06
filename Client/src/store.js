import { createStore , combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import {productsReducers, productDetailsReducer, newReviewReducer} from './reducers/productsReducers'
import { authReducer , userReducer ,forgotPasswordReducer} from './reducers/userReducer';
import {cartReducer} from './reducers/cartReducer';
import { newOrderReducer , myOrdersReducer , orderDetailsReducer} from './reducers/orderReducers';
const reducer = combineReducers({
        products : productsReducers,
        productDetails : productDetailsReducer,
        auth : authReducer,
        user : userReducer,
        forgotPassword : forgotPasswordReducer,
        cart: cartReducer,
        newOrder: newOrderReducer,
        myOrders: myOrdersReducer,
        orderDetails: orderDetailsReducer,
        newReview: newReviewReducer
        

})
//This will put all the data before loading the application
let initialState = {
        cart: {
            cartItems: localStorage.getItem('cartItems')
                ? JSON.parse(localStorage.getItem('cartItems'))
                : [],
            shippingInfo: localStorage.getItem('shippingInfo')
                ? JSON.parse(localStorage.getItem('shippingInfo'))
                : {}
        }
    }




const middleware = [thunk];
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware ))) 

export default store;