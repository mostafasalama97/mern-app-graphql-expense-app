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

export const TRANSACTION = gql`
  query transaction {
    # write the name you used on user.resolver in back - end
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



