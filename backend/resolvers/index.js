
/*
This file combines multiple resolver files into a single resolver object using a utility function from @graphql-tools/merge.
This is typically done to modularize resolver functions by their domain and then combine them for the GraphQL server setup.
*/

// Import the utility function to merge resolver objects.
import { mergeResolvers } from "@graphql-tools/merge";

// Importing individual resolver modules.
import userResolver from "./user.resolver.js";
import transactionResolver from "./transaction.resolver.js";

// Merging the imported resolvers into a single resolver object.
const mergedResolvers = mergeResolvers([userResolver, transactionResolver])

// Exporting the merged resolvers to be used in the GraphQL server setup.
export default mergedResolvers
