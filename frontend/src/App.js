import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';
import SupperClubApi from './api/SupperClubApi';
import UserContext from './auth/UserContext';
import Router from './routes/Router';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box';
import jwt from 'jsonwebtoken';
import NavBar from './routes/NavBar';
import Loading from './helpers/LoadingHelper';

export const TOKEN_STORAGE = 'storage-token';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE);
  const [dataLoaded, setDataLoaded] = useState(false);

  console.debug(
    'App',
    'dataLoaded=', dataLoaded,
    'currentUser=', currentUser,
    'token=', token,
  );

  useEffect(function getUserInfo() {
    console.debug('App useEffect getUserInfo', 'token=', token);

    async function getCurrentUser() {
      if (token) {
        try {
          let user = jwt.decode(token).username;
          SupperClubApi.token = token;
          let currentUser = await SupperClubApi.getCurrentUser(user);
          setCurrentUser(currentUser);
        } catch (err) {
          console.error('App problem loading', err);
          setCurrentUser(null);
        }
      }
      setDataLoaded(true);
    }
    setDataLoaded(false);
    getCurrentUser();
  }, [token]);

  async function signup(data) {
    try {
      let token = await SupperClubApi.addUser(data);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error('Registration failed.', err);
      return { success: false, err };
    }
  }

  async function login(data) {
    try {
      let token = await SupperClubApi.login(data);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error('login failed', err);
      return { success: false, err };
    }
  }

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  if (!dataLoaded) return <Loading />;

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <BrowserRouter>
          <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            <div>
              <NavBar logout={logout} />
              <Router login={login} signup={signup} />
            </div>
          </UserContext.Provider>
        </BrowserRouter>
      </Box>
    </Container>
  );
}

export default App;
