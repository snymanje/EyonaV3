import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

import { supabase } from '../../lib/supabase';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);

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
	children: PropTypes.element.isRequired
};
