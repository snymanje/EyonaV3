import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getActiveSession, loginRequest, registerRequest, logoutRequest } from './authentication.service';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    setUser(getActiveSession);
  }, [user]);

  const onRegister = async (email, password) => {
    try {
      setIsLoading(true);
      setAuthError(null);
      const profile = await registerRequest(email, password);
      setUser(profile);
    } catch (error) {
      setAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onLogin = async (email, password) => {
    try {
      setIsLoading(true);
      setAuthError(null);
      const profile = await loginRequest(email, password);
      setUser(profile);
    } catch (error) {
      setAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onLogout = async () => {
    try {
      await logoutRequest();
      setUser(null);
    } catch (error) {
      setAuthError(error);
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        authError,
        onRegister,
        onLogin,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

AuthenticationContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
