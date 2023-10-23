import { supabase } from "./client";

export async function InsertUser(user_id, first_name, last_name) {
    await supabase.from("users").insert({
      id: user_id,
      first_name: first_name,
      last_name: last_name,
    });
  }

export async function CreateUser (formData) {
    const data = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,

      options: {
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
        },
      },
    });
  
    if (data.error) {
      console.log(data.error);
      // return false to toggle on error message display for user
      return false;
    }
    // If no user sign up error, insert data into the public.users table
    else {
      let user_id = data.data.user.id;
      let first_name = data.data.user.user_metadata.first_name;
      let last_name = data.data.user.user_metadata.last_name;
      // insertPublicUser() is called to insert the signed-up user into the public.users table.
      InsertUser(user_id, first_name, last_name);
      return true;
    }
  }
  