// Import the Passport module for authentication.
import passport from "passport";

// Import bcryptjs for password hashing and verification. This is crucial for securely storing and comparing user passwords.
import bcrypt from "bcryptjs";

// Import the User model to interact with the user data in the database.
import User from "../models/user.model.js";

// Import GraphQLLocalStrategy to handle authentication with GraphQL.
import { GraphQLLocalStrategy } from "graphql-passport";

// Export a function to configure passport strategies and serialization methods.
export const configurePassport = async () => {
    // Serialize the user ID into the session. This is called when authentication succeeds,
    // and it's where you specify what user information should be stored in the session.
    passport.serializeUser((user, done) => {
        console.log("Serializing user");
        done(null, user.id);
    });

    // Deserialize the user from the session. This is called by Passport on every request
    // to extract the user details from the session data.
    passport.deserializeUser(async (id, done) => {
        console.log("Deserializing user");
        try {
            const user = await User.findById(id); // Fetch the user from the database using the ID stored in the session.
            done(null, user);  // If successful, the full user object is attached to the request as req.user.
        } catch (err) {
            done(err);  // Handle errors and pass them through the Passport middleware.
        }
    });

    // Use a GraphQL local strategy for authentication which is specifically designed to work with GraphQL endpoints.
    passport.use(
        new GraphQLLocalStrategy(async (username, password, done) => {
            try {
                // Find the user by their username.
                const user = await User.findOne({ username });
                if (!user) {
                    // If no user is found, pass a custom error message.
                    throw new Error("Invalid username or password");
                }
                // Compare the provided password with the hashed password stored in the database.
                const validPassword = await bcrypt.compare(password, user.password);

                if (!validPassword) {
                    // If the password doesn't match, throw an error.
                    throw new Error("Invalid username or password");
                }

                // If the credentials are correct, return the user object.
                return done(null, user);
            } catch (err) {
                // Handle any errors that occur during the process.
                return done(err);
            }
        })
    );
};
