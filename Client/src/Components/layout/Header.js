import React, { Fragment } from 'react'
import {Route , Link } from 'react-router-dom';
import Search from './Search';
import '../../App.css'
import {useAlert} from 'react-alert'
import {useDispatch,useSelector} from 'react-redux';
import {logout} from "../../actions/userActions"

const Header = () => {
  const alert = useAlert();
  const dispatch  = useDispatch();
  const {user,loading} = useSelector((state)=> state.auth)
  const logoutHandler=()=> {
    dispatch(logout());
    alert.success('Logged Out Successfully.')
  }

    return (
        
      <Fragment> 
                <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
        <Link to="/">
        <img src="./images/logo.png" alt="" />
         </Link>
        </div>
      </div>
      
      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Route render={({history}) => <Search history={history} /> } /> 
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
     
                {user ? ( 
                  <div className="ml-4 dropdown d-inline"> 
                   <span id="login_button_op"> Hi, {user && user.name}   </span>
                  <Link to="#!" className="btn dropdown-toggle text-white"
                   type="button" id="dropDownMenuButton" data-toggle="dropdown"
                      aria-haspopup="true" aria-expanded="false"></Link> 
                     
                      
                      
                    
                      <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                                {user && user.role === 'admin' && (
                                    <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                )}
                                <Link className="dropdown-item" to="/orders/me">Orders</Link>
                                <Link className="dropdown-item" to="/me">Profile</Link>
                                <Link className="dropdown-item text-danger font-weight-bold " to="/" onClick={logoutHandler} >
                                    Logout
                                </Link>
                            </div>
                  </div>
                ) : !loading  && <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>}

        <Link to="/cart" style={{textDecoration : 'none'}} > 
        <span id="cart" className="ml-3">Cart</span>
        <span className="ml-1" id="cart_count">2</span> 
        </Link> 
      </div>
    





    </nav>
      
     </Fragment>   
    )
}

export default Header
