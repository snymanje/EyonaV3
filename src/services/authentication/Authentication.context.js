import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { supabase } from '../../lib/supabase';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    setUser(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session);
    });
  }, [user]);

  const onRegister = async (email, password) => {
    try {
      setIsLoading(true);
      setAuthError(null);
      const { profile, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      setUser(profile);
    } catch (error) {
      console.log(error.error_description || error.message);
      setAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onLogin = async (email, password) => {
    try {
      setIsLoading(true);
      setAuthError(null);
      const { profile, error } = await supabase.auth.signIn({
        email,
        password,
      });
      if (error) throw error;
      setUser(profile);
    } catch (error) {
      console.log(error.error_description || error.message);
      setAuthError(authError);
    } finally {
      setIsLoading(false);
    }
  };

  const onLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.log(error.error_description || error.message);
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
        onLogin,
        onRegister,
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
