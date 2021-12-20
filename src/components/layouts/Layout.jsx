import React from 'react';
import Header from './Header';

const Layout = (props) => {
    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="pt-2 pb-2">
                    <h1>{props.pageTitle}</h1>
                    {props.children}
                </div>
            </div>

        </>
    );
};

export default Layout;