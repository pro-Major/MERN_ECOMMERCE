import React,{useEffect,Fragment} from 'react';
import  {Carousel} from 'react-bootstrap';
import Loader from '../layout/loader';
import MetaData from '../layout/MetaData';
import {useAlert} from 'react-alert';
import {useDispatch,useSelector} from 'react-redux';
import {getProductDetails , clearErrors} from '../../actions/productActions';





const ProductDetails = ({match}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {loading,error,product} = useSelector(state=> state.ProductDetails)



    useEffect(()=> {
    dispatch(getProductDetails(match.params.id))
    if(error){
        alert.error(error);
        dispatch(clearErrors());
    }
    },[dispatch,alert,error,match.params.id])
  
}

export default ProductDetails;
