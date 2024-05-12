// Import the necessary tool for merging.
import { mergeTypeDefs } from '@graphql-tools/merge';

// Import your type definitions.
import userTypeDef from './userTypeDef.js';
import transactionTypeDef from './transactionTypeDef.js';

// Merge your type definitions correctly.
const mergedTypeDefs = mergeTypeDefs([userTypeDef, transactionTypeDef]);

// Export the merged type definitions.
export default mergedTypeDefs;
