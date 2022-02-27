import { supabase } from '../../lib/supabase';

export const getActiveSession = () => supabase.auth.session();

export const loginRequest = async (email, password) => {
  const { user, error } = await supabase.auth.signIn({
    email,
    password,
  });
  if (error) throw error;

  return user;
};

export const registerRequest = async (email, password) => {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;

  return user;
};

export const logoutRequest = async () => {
  await supabase.auth.signOut();
};
