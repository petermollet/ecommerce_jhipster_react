import React from 'react';

const Loader = ({ small }) => {
    return (
        <div className="d-flex justify-content-center ">
           {<div className={`spinner-border ${small && 'spinner-border-sm'} text-success`} role="status">
                <span className="sr-only">Loading...</span>
            </div>}
        </div>
    );
};

export default Loader;