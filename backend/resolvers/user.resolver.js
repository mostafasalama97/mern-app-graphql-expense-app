// Importing bcrypt for password hashing.
import bcrypt from 'bcryptjs';

// Importing the User model from the models directory.
import User from '../models/user.model.js';

import Transaction from '../models/transaction.models.js';

// Define the user resolver with its Query and Mutation resolvers.
const userResolver = {
    // Define the Mutation field resolvers within the resolver object.
    Mutation: {
        // Define an asynchronous resolver function to handle user sign-up.
        signUp: async (_, { input }, context) => {
            try {
                const { username, password, gender, name } = input;

                // Check if all required fields are provided.
                if (!username || !password || !gender || !name) {
                    throw new Error("All fields are Required");
                }

                // Check if a user with the given username already exists.
                const existingUser = await User.findOne({ username });
                if (existingUser) throw new Error("User already exists");

                // Generate a salt and hash the password using bcrypt.
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                // Generate profile picture URLs based on the user's gender.
                const boyProfilePic = `https://avatar-placeholder.iran.liara.run/public/boy?username=${username}`;
                const girlProfilePic = `https://avatar-placeholder.iran.liara.run/public/girl?username=${username}`;

                // Create a new user with the provided input and the hashed password.
                const newUser = new User({
                    username,
                    password: hashedPassword,
                    gender,
                    name,
                    profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
                });

                // Save the new user to the database.
                await newUser.save();

                // Log the user in by setting the session context.
                await context.login(newUser);
                return newUser;
            } catch (err) {
                // Log the error and throw a new error indicating a problem with the sign-up process.
                console.log("Error in sign up: ", err.message);
                throw new Error(err.message || "Internal Server Error");
            }
        },
        // Define an asynchronous resolver function to handle user login.
        login: async (_, { input }, context) => {
            try {
                const { username, password } = input;

                // Check if all required fields are provided.
                if (!username || !password) {
                    throw new Error("All fields are Required");
                }

                // Check if a user with the given username exists.
                const existingUser = await User.findOne({ username });
                if (!existingUser) throw new Error("This User does not exist");

                // Authenticate the user using context's authenticate method.
                const { user } = await context.authenticate("graphql-local", { username, password });

                // Log the user in by setting the session context.
                await context.login(user);
                return user;
            } catch (err) {
                // Log the error and throw a new error indicating a problem with the login process.
                console.log("Error in login: ", err.message);
                throw new Error(err.message || "Internal Server Error");
            }
        },
        // Define an asynchronous resolver function to handle user logout.
        logout: async (_, __, context) => {
            try {
                await context.logout();
                context.req.session.destroy((err) => {
                    if (err) throw err;
                });
                context.res.clearCookie("connect.sid");

                return { message: "Logged out successfully" };
            } catch (err) {
                console.error("Error in logout:", err);
                throw new Error(err.message || "Internal server error");
            }
        },
    },
    // Define the Query field resolvers within the resolver object.
    Query: {
        // Define an asynchronous resolver function to retrieve the authenticated user.
        authUser: async (_, __, context) => {
            try {
                const user = await context.getUser();
                return user;
            } catch (err) {
                console.log("Error in authUser: ", err.message);
                throw new Error(err.message || "Internal Server Error");
            }
        },
        // Define an asynchronous resolver function to retrieve a user by their ID.
        user: async (_, { userId }) => {
            try {
                // Find the user by their ID in the database.
                const user = await User.findById(userId);
                return user;
            } catch (err) {
                // Log the error and throw a new error indicating a problem with retrieving the user.
                console.log("Error in user: ", err.message);
                throw new Error(err.message || "Internal Server Error");
            }
        }
    },
    User: {
        transactions: async (parent) => {
            try {
                    const transactions = await Transaction.find({userId: parent._id})
                    return transactions;
            } catch (err) {
                console.log("Error in user.transactions resolver: ", err);
                throw new Error(err.message || "Internal server error");
            }
        }
    }
}

// Export the userResolver to make it available for combining with other resolvers in the GraphQL API.
export default userResolver;
