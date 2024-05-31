import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import GridBackground from './components/GridBackground.jsx'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


const client = new ApolloClient({
  // TODO: update the uri on production
  uri: 'http://localhost:4000/graphql',  // url of our graphQl server
  cache: new InMemoryCache(), // apollo client uses to cache query result after fetching them
  credentials: "include", // this tells apollo client to send cookies along with every request to the server
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <GridBackground>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </GridBackground>
    </BrowserRouter>
  </React.StrictMode>,
)
