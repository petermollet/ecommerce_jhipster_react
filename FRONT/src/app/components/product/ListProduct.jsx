import React, { useEffect, useState } from 'react';
import { getAllProduct } from './../../api/backend/product';
import Product from './Product';
import Loader from '../../shared/components/Loader';

const ListProduct = () => {

    const [ products, setproducts ] = useState([])
    const [ isLoading, setLoading ] = useState(true)

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = () => {
        getAllProduct().then(res => {
            if(res.status === 200) {
                setproducts(res.data)
                setLoading(false)
            }
        })
    }

    if(isLoading) return <Loader />
    return (
        <div className='row d-flex justify-content-center'>
            {products.map((product, index) => <Product product={product} key={index} />)}
        </div>
    );
};

export default ListProduct;