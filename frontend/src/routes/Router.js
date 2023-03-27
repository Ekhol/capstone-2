import { Navigate, Route, Routes, Outlet } from 'react-router-dom';
import React, { useContext } from 'react';
import Homepage from './Homepage';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
import PostList from '../posts/postList';
import NewPostForm from '../posts/newPostForm';
//import Profile from '../auth/Profile';
import UserContext from '../auth/UserContext';
import PostDetail from '../posts/postDetail';

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
            <Route path="/posts" element={<PostList />} />
            <Route path='/posts/:id' element={<PostDetail />} />
            <Route element={<ProtectedRoute user={currentUser} />}>
                <Route path="/posts/new" element={<NewPostForm />} />
            </Route>
            <Route path="/" element={<Homepage />} />
        </Routes>
    );
}

export default Router;