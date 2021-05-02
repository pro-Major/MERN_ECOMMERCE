import {BrowserRouter as Router, Route} from 'react-router-dom'; 
import {useEffect} from 'react';
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
function App() {
  useEffect(()=> {
    store.dispatch(loadUser())
  },[])
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
              <ProtectedRoute path='/order/confirm' component={ConfirmOrder} />





       <Footer/>
        </div>
        </div>
      </Router>
        
    )
  }


export default App;
