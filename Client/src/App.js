import {BrowserRouter as Router, Route} from 'react-router-dom'; 
import {useEffect,useState} from 'react';
import { useSelector } from 'react-redux'

import Header from './Components/layout/Header';
import Footer from './Components/layout/Footer';
import Home from './Components/Home';
import React from 'react';
import ProductDetails from './Components/product/ProductDetails';
import Login from './Components/user/Login'
import Register from './Components/user/Register'
import {forgotPassword, loadUser} from './actions/userActions'
import store from './store'
import Profile from './Components/user/Profile';
import UpdateProfile from './Components/user/UpdateProfile';
import ProtectedRoute from './Components/route/ProtectedRoute';
import UpdatePassword from './Components/user/updatePassword';
import ForgotPassword from './Components/user/ForgotPassword';
import NewPassword from './Components/user/NewPassword';
import Cart from './Components/cart/Cart';
import Shipping from './Components/cart/Shipping';
import ConfirmOrder from './Components/cart/ConfirmOrder'
import axios from 'axios';
import Payment from './Components/cart/Payment';
import ListOrders from './Components/order/ListOrders';
import OrderSuccess from './Components/cart/OrderSuccess';
import OrderDetails from './Components/order/OrderDetails';
import OrderList from './Components/admin/OrdersList';
import ProcessOrder from './Components/admin/ProcessOrder';
//Admin Imports
import Dashboard from './Components/admin/Dashboard';
import ProductList from './Components/admin/ProductList';
import NewProduct from './Components/admin/NewProduct';
import UpdateProduct from './Components/admin/UpdateProduct'
import UsersList from './Components/admin/UsersList'
import UpdateUser from './Components/admin/UpdateUser'
import ProductReviews from './Components/admin/ProductReviews'


// Payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

function App() {
  const [stripeApiKey,setStripeApiKey] = useState('');
  useEffect(()=> {
    store.dispatch(loadUser())
    async function getStripApiKey() {
      const {data} = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey)

        }
        getStripApiKey()
  },[])
  const { user, isAuthenticated, loading } = useSelector(state => state.auth)

    return ( 
      <Router> 
        <div className="App">
        <Header/>
          <div className="container container-fluid" > 
              <Route path='/cart' component={Cart} exact />
              <Route path='/' component={Home} exact />
              <Route path='/search/:keyword' component={Home} />
              <Route path='/product/:id' component={ProductDetails} exact />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register}/>
              <Route path='/password/forgot' component={ForgotPassword} exact/>
              <Route path='/password/reset/:token' component={NewPassword} exact/>


              <ProtectedRoute path='/me' component={Profile} exact/>
              <ProtectedRoute path='/me/update' component={UpdateProfile} exact/>.
              <ProtectedRoute path='/password/update' component={UpdatePassword} exact/>
              <ProtectedRoute path='/shipping' component={Shipping} />
              <ProtectedRoute path='/confirm/order' component={ConfirmOrder} />
              <ProtectedRoute path='/success' component={OrderSuccess} exact />




              {stripeApiKey &&
                 <Elements stripe={loadStripe(stripeApiKey)}>
                   <ProtectedRoute path="/payment" component={Payment} />
               </Elements>
          }

                <ProtectedRoute path='/orders/me' component={ListOrders} exact />
                <ProtectedRoute path='/order/:id' component={OrderDetails} exact />
                </div>


              <ProtectedRoute path='/dashboard' isAdmin={true} component={Dashboard} exact />
              <ProtectedRoute path='/admin/products' isAdmin={true} component={ProductList} exact />
              <ProtectedRoute path='/admin/product' isAdmin={true} component={NewProduct} exact />
              <ProtectedRoute path="/admin/product/:id" isAdmin={true} component={UpdateProduct} exact />
              <ProtectedRoute path="/admin/orders" isAdmin={true} component={OrderList} exact />
              <ProtectedRoute path='/admin/order/:id' component={ProcessOrder} exact/>
              <ProtectedRoute path="/admin/users" isAdmin={true} component={UsersList} exact />
              <ProtectedRoute path="/admin/user/:id" isAdmin={true} component={UpdateUser} exact />
              <ProtectedRoute path="/admin/reviews" isAdmin={true} component={ProductReviews} exact />











              {!loading && (!isAuthenticated || user.role !== 'admin') && (
          <Footer />
        )}

     
        
        </div>
      </Router>
        
    )
  }


export default App;
