import React, { useState } from "react";
import { SignInUser } from "../../Models/client";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async (e) => {
        e.preventDefault();
        const success = await SignInUser(email, password);
        if (success) {
            console.log("User signed in successfully");
            // Redirect to dashboard or home page
        } else {
            console.log("Sign in failed");
            // Display error message to user
        }
    };

    return (
        <form onSubmit={handleSignIn}>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <button type="submit">Sign In</button>
        </form>
    );
}

export default SignIn;
