import { gql } from '@apollo/client';


// you are create a query
export const TRANSACTIONS = gql`
  query transactions {
    transactions {
      _id
      description
      paymentType
      category
      amount
      date
      location
    }
  }
`;

export const GET_ONE_TRANSACTION = gql`
  query getOneTransaction($id:ID!) {
    # write the name you used on user.resolver in back - end
    transaction(transactionId: $id) {
        _id
        description
        paymentType
        category
        amount
        date
        location
        user {
              name
              username
              profilePicture
			  }
    }
}
`;

export const GET_TRANSACTION_STATISTICS = gql`
query getTransactionStatistics {
  categoryStatistics {
    category
    totalAmount
  }
}
`

