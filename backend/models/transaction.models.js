/*
2. transaction.model.js
This file will define the schema for transaction data, which might include fields like user references, amounts, dates, etc.
*/
// Import the Mongoose module, which is used for schema definitions and interacting with MongoDB.
import mongoose from "mongoose";

// Define the schema for the 'Transaction' collection in MongoDB.
const transactionSchema = new mongoose.Schema({
    // Define a 'userId' field as an ObjectId that creates a reference to the 'User' model.
    // This is used to associate each transaction with a specific user.
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,  // This field is mandatory.
    },
    // Define a 'description' field as a string that describes the transaction.
    description: {
        type: String,
        required: true,  // This field is mandatory.
    },
    // Define a 'paymentType' field as a string. It must be either 'cash' or 'card'.
    // The 'enum' option restricts the value to the specified options.
    paymentType: {
        type: String,
        enum: ["cash", "card"],
        required: true,  // This field is mandatory.
    },
    // Define a 'category' field as a string. It must be one of 'saving', 'expense', or 'investment'.
    // The 'enum' option restricts the value to these specified options.
    category: {
        type: String,
        enum: ["saving", "expense", "investment"],
        required: true,  // This field is mandatory.
    },
    // Define an 'amount' field as a number that records the monetary value of the transaction.
    amount: {
        type: Number,
        required: true,  // This field is mandatory.
    },
    // Define a 'location' field as a string that indicates where the transaction took place.
    // If not specified, it defaults to "Unknown".
    location: {
        type: String,
        default: "Unknown",
    },
    // Define a 'date' field as a Date object that stores the date of the transaction.
    // This field is mandatory.
    date: {
        type: Date,
        required: true,
    },
});

// Create a model named 'Transaction' using the schema defined above.
// This model will be used to interact with the 'transactions' collection in the database.
const Transaction = mongoose.model("Transaction", transactionSchema);

// Export the Transaction model so it can be imported and used in other parts of the application,
// such as in service layers or controllers to interact with transaction data.
export default Transaction;
