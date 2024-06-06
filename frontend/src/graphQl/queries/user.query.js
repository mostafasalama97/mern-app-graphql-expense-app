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

export const GET_USER_TRANSACTION = gql`
	query GetUserAndTransactions($userId: ID!) {
		user(userId: $userId) {
			_id
			name
			username
			profilePicture
			# relationships
			transactions {
				_id
				description
				paymentType
				category
				amount
				location
				date
			}
		}
	}
`;


