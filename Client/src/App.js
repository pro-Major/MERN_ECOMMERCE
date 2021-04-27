import {BrowserRouter as Router, Route} from 'react-router-dom'; 
import {useEffect} from 'react';
import Header from './Components/layout/Header';
import Footer from './Components/layout/Footer';
import Home from './Components/Home';
import React from 'react';
import ProductDetails from './Components/product/ProductDetails';
import Login from './Components/user/Login'
import Register from './Components/user/Register'
import {loadUser} from './actions/userActions'
import store from './store'
import Profile from './Components/user/Profile';
function App() {
  useEffect(()=> {
    store.dispatch(loadUser())
  },[])
    return (
      <Router> 
        <div className="App">
        <Header/>
          <div className="container container-fluid" > 
          
              <Route path='/' component={Home} exact />
              <Route path='/search/:keyword' component={Home} />
              <Route path='/product/:id' component={ProductDetails} exact />
              <Route path='/login' component={Login}/>
              <Route path='/register' component={Register}/>
              <Route path='/me' component={Profile}/>

       <Footer/>
        </div>
        </div>
      </Router>
        
    )
  }


export default App;
