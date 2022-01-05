import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Redirect, Route } from 'react-router-dom';
import useAuth from './../../hooks/useAuth';
import "./PrivateRoute.css"

const PrivateRoute = ({ children, ...rest }) => {
    // const {children, ...rest} = props;
    const { user, isLoading } = useAuth();
    if(isLoading){
        return <div className="text-center loading-spinner mt-5"><Spinner animation="border" variant="warning" /></div>;
    }
    return (
        <Route
            {...rest}
            render={({ location }) => user.email ?
                children :
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: location }
                    }}
                ></Redirect>}
        >

        </Route>
    );
};

export default PrivateRoute;