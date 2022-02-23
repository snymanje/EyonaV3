import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { supabase } from '../../lib/supabase';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		setUser(supabase.auth.session());

		supabase.auth.onAuthStateChange((_event, session) => {
			setUser(session);
		});
	}, [user]);

	const onRegister = async (email, password) => {
		try {
			setIsLoading(true);
			const { user } = await supabase.auth.signUp({
				email,
				password,
			});
			setUser(user);
		} catch (error) {
			console.log(error.error_description || error.message);
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	const onLogin = async (email, password) => {
		try {
			setIsLoading(true);
			const { user } = await supabase.auth.signIn({
				email,
				password,
			});
			setUser(user);
		} catch (error) {
			console.log(error.error_description || error.message);
			setError(error);
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
			setError(error);
		}
	};

	return (
		<AuthenticationContext.Provider
			value={{
				isAuthenticated: !!user,
				user,
				isLoading,
				error,
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
