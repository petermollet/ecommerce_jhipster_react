import React from 'react';

const Product = ({ product }) => {
    return (
        <div className="col-sm-4 mb-3">
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="d-flex justify-content-around">
                        <h4>{ product.name }</h4>
                        <p style={{ marginTop:'5px' }}>€{ product.price }</p>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type='button' className="btn btn-success btn-sm" >
                            voir produit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;