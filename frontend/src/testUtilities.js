import React from 'react';
import UserContext from './auth/UserContext';

const testUser = {
    username: 'testuser',
    first_name: 'Test',
    last_name: 'User',
};

const UserProvider = ({ children, currentUser = testUser }) => (
    <UserContext.Provider value={{ currentUser }}>
        {children}
    </UserContext.Provider>
);

export { UserProvider };