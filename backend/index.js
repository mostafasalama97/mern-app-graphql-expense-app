// Importing modules for setting up Apollo Server for handling GraphQL APIs.
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

// Importing Express to handle HTTP server operations and middleware functionalities.
import express from 'express';

// Importing the HTTP standard library to create a basic HTTP server.
import http from 'http';

// Importing CORS middleware to enable Cross-Origin Resource Sharing, allowing requests from specified origins.
import cors from 'cors';

// Importing GraphQL resolvers and type definitions that define the schema and how to resolve queries.
import mergedResolvers from './resolvers/index.js';
import mergedTypeDefs from "./typeDefs/index.js";

// Importing dotenv to manage environment variables.
import dotenv from 'dotenv';
// Importing a custom function to connect to the database.
import { connectDB } from "./db/connectDB.js";

// Importing Passport for authentication handling.
import passport from "passport";
// Importing session management middleware for Express.
import session from "express-session";
// Importing a session store implementation that uses MongoDB.
import connectMongo from "connect-mongodb-session";

// Importing utility functions to build context for GraphQL requests.
import { buildContext } from "graphql-passport";
// Importing a configuration function to setup Passport strategies.
import { configurePassport } from "./passport/passport.config.js"
import path from "path";


import job from "./cron.js"
dotenv.config();  // if you donot call this function wyou will not be able to use environment variables
const __dirname = path.resolve()
configurePassport(); // Execute passport configuration function.
job.start();
// Initializing the Express application to handle HTTP requests.
const app = express();

// Creating an HTTP server by passing the Express application. This allows for more detailed control over HTTP features.
const httpServer = http.createServer(app);


// Configure session store using MongoDB.
const MongoDbStore = connectMongo(session);
const store = new MongoDbStore({
    uri: process.env.MONGO_URL,  // MongoDB connection URL from environment variables.
    collection: "session"  // Name of the collection to store sessions.
});

// Listen for 'error' events on the session store. This is useful for debugging and
// handling errors related to your session management, such as issues with the session store.
store.on("error", (err) => {
    // Log the error to the console. This could be expanded to include more sophisticated error
    // handling mechanisms, such as logging to an external service, sending notifications, etc.
    console.error(err);
});

// Configure the Express application to use sessions.
app.use(
    session({
        secret: process.env.SESSION_SECRET,  // A secret key used to sign the session ID cookie.
        // This should be a random, high-entropy string stored
        // securely and should not be exposed in your codebase.

        resave: false,  // Tells the session middleware whether to save the session back to the
        // session store, even if the session was never modified during the request.
        // Setting this to false is recommended for performance reasons and to
        // avoid unnecessary session store hits.

        saveUninitialized: false,  // This flag determines whether to save a new session that has not been
        // modified. Setting it to false helps with complying with laws that
        // require permission before setting a cookie and reduces session store usage.
        cookie: {
            maxAge: 1000 * 60 * 60 * 7, // expires after 7 days
            httpOnly: true // to prevent cross-side scripting (xcc) attacks
        },
        store: store, // Session store instance for storing sessions.
    })
)

// Initialize Passport and session handling middleware in Express.
app.use(passport.initialize());
app.use(passport.session());

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
    '/graphql',  // Base path for all routes.
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    }),  // Enables CORS to allow cross-origin requests.
    express.json(),  // Parses incoming requests with JSON payloads.
    expressMiddleware(server, {  // Integrate Apollo Server with Express, enabling GraphQL endpoint handling via Express.
        context: async ({ req, res }) => buildContext({ req, res }) // Function to build context for each GraphQL request.

    }),
);

// use WebGL2RenderingContext.com to deploy the application
// front-end and backend under the same domain 

// npm run build for frontend application to generate dist folder
app.use(express.static(path.join(__dirname, "frontend/dist")));  // Serve static files from the specified directory.
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/dist" ,"index.html"));
});


// Start the HTTP server and listen on port 4000, ensuring it is fully ready before moving forward.
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
await connectDB(); // Connect to the database.
// Log to console once the server is ready and listening on the specified port.
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
