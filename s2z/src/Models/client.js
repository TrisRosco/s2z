import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// sign in user
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
  } catch (error) {
    console.log("Sign in error: ", error);
    return false;
  }
}

// Check if a user is signed in
export async function IsUserSignedIn() {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.log(error);
      return false;
    } else {
      if (data.session) {
        console.log("A user is signed in.", data);
        return true;
      } else {
        console.log("A user is not signed in.", data);
        return false;
      }
    }
  } catch (error) {
    // Handle any other errors that may occur
    console.error(error);
    return false;
  }
}

// Get current user id
export async function GetCurrentUserID() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user.id;
}

// Sign out

export async function SignOutUser() {
  await supabase.auth.signOut();
}
