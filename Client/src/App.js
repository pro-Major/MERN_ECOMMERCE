import {BrowserRouter as Router, Route} from 'react-router-dom'; 
import Header from './Components/layout/Header';
import Footer from './Components/layout/Footer';
import Home from './Components/Home';
import React from 'react';
import { render } from 'react-dom';



function App() {
    return (
      <Router> 
        <div className="App">
        <Header/>
          <div className="container container-fluid" > 
          
              <Route path='/' component={Home} exact />
       <Footer/>
        </div>
        </div>
      </Router>
        
    )
  }


export default App;
