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
import NewCommentForm from '../posts/newCommentForm';
import CountryRoute from './CountryRoute';

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
            <Route path='/country/:id' element={<CountryRoute />} />
            <Route element={<ProtectedRoute user={currentUser} />}>
                <Route path="/posts/new" element={<NewPostForm />} />
                <Route path='/posts/:id/comment' element={<NewCommentForm />} />
            </Route>
            <Route path="/" element={<Homepage />} />
        </Routes>
    );
}

export default Router;