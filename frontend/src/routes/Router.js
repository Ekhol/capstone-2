import { Navigate, Route, Routes, Outlet } from 'react-router-dom';
import React, { useContext } from 'react';
import Homepage from './Homepage';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
//import Profile from '../authentication/Profile';
import UserContext from '../auth/UserContext';

function ProtectedRoute({ user, redirect = "/" }) {
    if (!user) {
        return <Navigate to={redirect} replace />
    }

    return <Outlet />;
}

function Router({ login, signup }) {
    const { currentUser } = useContext(UserContext);
    return (
        <Routes>
            <Route path="/login" element={<LoginForm login={login} />} />
            <Route path="/signup" element={<SignupForm signup={signup} />} />
            <Route element={<ProtectedRoute user={currentUser} />}>
            </Route>
            <Route path="/" element={<Homepage />} />
        </Routes>
    );
}

export default Router;