import { gql } from '@apollo/client';



// you create mutation for sign up process
export const SIGN_UP = gql`
mutation signUp($input: SignUpInput!) {  # input here is according to typeDefs in user.typeDefs
    signUp(input: $input){
    _id
    name
    username
  }
}
`;


export const LOG_IN = gql`
mutation login($input: LoginInput!) {  # input here is according to typeDefs in user.typeDefs
  login(input: $input){
    _id
    name
    username
  }
}
`;



export const LOG_OUT = gql`
mutation logout {
  logout{
    message
  }
}

`;




