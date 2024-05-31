// Import Mongoose models for Transaction and User from their respective files.
import Transaction from "../models/transaction.models.js";

// Define the transactionResolver object which will handle GraphQL queries and mutations related to transactions.
const transactionResolver = {
    // Define the Query field resolvers within the resolver object.
    Query: {
        // Define an asynchronous resolver function to retrieve all transactions associated with the authenticated user.
        transactions: async (_, __, context) => {
            try {
                if (!context.getUser()) throw new Error("Unauthorized");
                const userId = await context.getUser()._id;

                const transactions = await Transaction.find({ userId });
                return transactions;
            } catch (err) {
                console.error("Error getting transactions:", err);
                throw new Error("Error getting transactions");
            }
        },
        // Define an asynchronous resolver function to retrieve a single transaction by its ID.
        transaction: async (_, transactionId) => {
            try {
                // Find the transaction by its ID in the database.
                const transaction = await Transaction.findById(transactionId)
                return transaction
            } catch (err) {
                // Log the error and throw a new error indicating a problem with fetching the specific transaction.
                console.error("Error getting transaction:", err);
                throw new Error("Error getting transaction");
            }
        }
    },
    // Define the Mutation field resolvers within the resolver object.
    Mutation: {
        // Define an asynchronous resolver function to create a new transaction.
        createTransaction: async (_, { input }, context) => {
            try {
                // Create a new transaction using the input provided and the user's ID from the context.
                const newTransaction = new Transaction({
                    ...input,
                    userId: context.getUser()._id,
                });
                // Save the new transaction to the database.
                await newTransaction.save();
                return newTransaction;
            } catch (err) {
                // Log the error and throw a new error indicating a problem with creating the transaction.
                console.error("Error creating transaction:", err);
                throw new Error("Error creating transaction");
            }
        },
        // Define an asynchronous resolver function to update an existing transaction.
        updateTransaction: async (_, { input }) => {
            try {
                // Update the transaction identified by input.transactionId with the new input values, and return the updated transaction.
                const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId, input, {
                    new: true,
                });
                return updatedTransaction;
            } catch (err) {
                // Log the error and throw a new error indicating a problem with updating the transaction.
                console.error("Error updating transaction:", err);
                throw new Error("Error updating transaction");
            }
        },
        // Define an asynchronous resolver function to delete a transaction by its ID.
        deleteTransaction: async (_, { transactionId }) => {
            try {
                // Delete the transaction identified by transactionId from the database.
                const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
                return deletedTransaction;
            } catch (err) {
                // Log the error and throw a new error indicating a problem with deleting the transaction.
                console.error("Error deleting transaction:", err);
                throw new Error("Error deleting transaction");
            }
        },

    },
}

// Export the transactionResolver to make it available for combining with other resolvers in the GraphQL API.
export default transactionResolver;
