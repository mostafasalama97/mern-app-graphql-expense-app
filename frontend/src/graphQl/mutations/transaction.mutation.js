import { gql } from '@apollo/client';


export const CREATE_TRANSACTION = gql`
mutation createTransaction($input: CreateTransactionInput!){
    createTransaction(input: $input){
        _id
        description
        paymentType
        category
        amount
        date
        location
    }
}
`


export const UPDATE_TRANSACTION = gql`
mutation updateTransaction($input: UpdateTransactionInput!){
    updateTransaction(input: $input){
        _id
        description
        paymentType
        category
        amount
        date
        location
    }
}
`



export const DELETE_TRANSACTION = gql`
mutation deleteTransaction($transactionId:ID!){
    deleteTransaction(transactionId: $transactionId){
_id
    }
}
`



