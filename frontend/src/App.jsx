import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import TransactionPage from './pages/TransactionPage';
import NotFound from './pages/NotFound';
import Header from "./components/ui/Header";
import { useQuery } from "@apollo/client";
import { Toaster } from 'react-hot-toast';

import { GET_AUTH_USER } from "./graphQl/queries/user.query";


function App() {
  // to call the query
  const { loading, error, data } = useQuery(GET_AUTH_USER);

  if(loading) return null;
  return (
    <>
      {data?.authUser && <Header />}
      <Routes>
        <Route path="/" element={data.authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!data.authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!data.authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path='/transaction/:id' element={data.authUser ? <TransactionPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
