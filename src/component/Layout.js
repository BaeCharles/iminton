import React from 'react';

const Layout = ({ children }) => {
    return (
        <div>
            <div className='layout'>
                { children }
            </div>
        </div>
    );
};

export default Layout;