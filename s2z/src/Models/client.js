import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function SignInUser(email, password) {
    try {
        const { error } = await supabase.auth.signIn({
            email: email,
            password: password,
        });

        if (error) {
            console.log("Sign in error: ", error);  
            return false;
        } else {
            return true;
        }
    }
    catch (error) {
        console.log("Sign in error: ", error);
        return false;
    }
}



