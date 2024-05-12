import { users } from "../dummyData/data.js";


// Define the transaction resolver with its Query and Mutation placeholders.
const transactionResolver = {
    // Currently no Query resolvers are defined.
    Query: {
        // to get all users 
        users: () => {
            return users;
        },
        // to return one user according to id
        user: (_, { userId }) => {
            return users.find((user) => user._id === userId)
        }
    },
    // Currently no Mutation resolvers are defined.
    Mutation: {},
}

// Exporting the transactionResolver to make it available for combining with other resolvers.
export default transactionResolver;
