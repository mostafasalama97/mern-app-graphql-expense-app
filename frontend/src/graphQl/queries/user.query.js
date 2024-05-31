import { gql } from '@apollo/client';


// you are create a query
export const GET_AUTH_USER = gql`
  query GetAuthUser {
    # write the name you used on user.resolver in back-end
    authUser {
     _id
     username
     name
     profilePicture
    }
  }
`;


