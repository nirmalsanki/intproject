import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../actions/auth.action';
const Header = () => {
    const dispatch = useDispatch();
    const email = useSelector((state) => state.auth.email);


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <span className="navbar-brand" >INT.</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li></li>
                        </ul>
                        <span className="navbar-text">
                            <strong>Welcome:</strong> <span className="small">{email}</span> | <button className="btn btn-primary btn-sm" onClick={() => dispatch(logout())}> Logout</button>
                        </span>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
