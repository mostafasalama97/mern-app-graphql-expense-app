// Importing dummy data for users from a local file.
import { users } from '../dummyData/data.js';

// Define the user resolver with its Query and Mutation resolvers.
const userResolver = {
    // The Query object contains resolver functions for various queries.
    Query: {
        // Resolver function for 'users' query, which returns the list of users.
        users: (_, _, { req, res }) => {
            return users
        },
        user: (_, { userId }) => {
            return users.find((user) => user._id === userId)
        }
    },
    // Mutation object, presumably for user mutations, is currently empty.
    Mutation: {}
}

// Exporting the userResolver to make it available for combining with other resolvers.
export default userResolver;
