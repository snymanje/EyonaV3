import { SUPABASE_KEY } from "@env";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hvyovmyxynoswtgnqybk.supabase.co";
const supabaseKey = SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey, {
  localStorage: AsyncStorage,
  detectSessionInUrl: false,
  // autoRefreshToken: true,
  // persistSession: true
  // url: string,
  // headers?: { [key: string]: string },
});
