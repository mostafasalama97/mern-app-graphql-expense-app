// Importing the necessary modules from the Apollo server package for GraphQL API setup.
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

// Importing Express, a web application framework for Node.js for handling HTTP server operations.
import express from 'express';

// Importing the HTTP library to create an HTTP server.
import http from 'http';

// Importing CORS middleware to enable Cross-Origin Resource Sharing on our server.
import cors from 'cors';

// Importing our defined GraphQL resolvers and type definitions.
import mergedResolvers from './resolvers/index.js';
import mergedTypeDefs from "./typeDefs/index.js";


import dotenv from 'dotenv';
import { connectDB} from "./db/connectDB.js"

dotenv.config();  // if you donot call this function wyou will not be able to use environment variables
// Initializing the Express application to handle HTTP requests.
const app = express();

// Creating an HTTP server by passing the Express application. This allows for more detailed control over HTTP features.
const httpServer = http.createServer(app);

// Initializing the ApolloServer with the type definitions and resolvers for the GraphQL API, and adding a plugin for graceful shutdown.
const server = new ApolloServer({
    typeDefs: mergedTypeDefs,  // Definitions of the GraphQL schema to specify API structure.
    resolvers: mergedResolvers,   // Functions to resolve queries and mutations specified in the GraphQL schema.
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })], // Plugin to ensure HTTP connections can be drained properly on server shutdown.
});

// Start the Apollo server before handling any incoming requests.
await server.start();

// Configure the Express application with necessary middleware.
app.use(
    '/',  // Base path for all routes.
    cors(),  // Enables CORS to allow cross-origin requests.
    express.json(),  // Parses incoming requests with JSON payloads.
    expressMiddleware(server, {  // Integrate Apollo Server with Express, enabling GraphQL endpoint handling via Express.
        context: async ({ req }) => ({ req }),  // Provides a way to access request object in resolver functions.
    }),
);

// Start the HTTP server and listen on port 4000, ensuring it is fully ready before moving forward.
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
await connectDB()
// Log to console once the server is ready and listening on the specified port.
console.log(`🚀 Server ready at http://localhost:4000/`);
