import { createStore , combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import {productsReducers, productDetailsReducer} from './reducers/productsReducers'
import { authReducer , userReducer ,forgotPasswordReducer} from './reducers/userReducer';


 
const reducer = combineReducers({
        products : productsReducers,
        productDetails : productDetailsReducer,
        auth : authReducer,
        user : userReducer,
        forgotPassword : forgotPasswordReducer
        

})
//This will put all the data before loading the application
let initialState = {}





const middleware = [thunk];
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware ))) 

export default store;