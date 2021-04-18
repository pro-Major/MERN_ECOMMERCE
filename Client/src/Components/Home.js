import React, { Fragment, useEffect } from 'react';
import MetaData from './layout/MetaData';
import Product from './product/Product';
import Loader from './layout/loader';
import {useDispatch,useSelector} from 'react-redux';
import {useAlert} from 'react-alert';

import {getProducts} from '../actions/productActions';
const Home = () => {  
    const alert = useAlert();
    const  dispatch = useDispatch();
    const {loading,products,error,productsCount} = useSelector(state => state.products)

    useEffect(() => {
      dispatch(getProducts());

      if(error){
        return alert.error(error)
      }

    }, [dispatch, alert , error])  //when its value will change useEffect will refresh


    return (
       <Fragment>
         {loading ? <h1> <Loader/> </h1> : ( 
           <Fragment>
                    <MetaData title={'Buy Branded Product Online - E-commerce'}/> 
                    <h1 id="products_heading">Latest Products</h1>


                  <section id="products" className="container mt-5">
                          <div className="row">
                             {products && products.map(product => (
                                <Product key={product._id} product={product} />
                              ))}

                    </div>
                  </section>
              </Fragment>
                    )}

</Fragment>
             
    )
}

export default Home;
