import React from "react";
import Card from "./Card";
import { TRANSACTIONS } from "../graphQl/queries/transaction.query";
import { useQuery } from '@apollo/client';

const Cards = () => {
	const { loading, data, error } = useQuery(TRANSACTIONS);
	if (error) return <p>Error: {error.message}</p>;
	if (loading) return <p>Loading...</p>;

	console.log("data cards", data);

	return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl font-bold text-center my-10'>History</p>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
				{data?.transactions.map(transaction => (
					<Card key={transaction._id} transaction={transaction} />
				))}
			</div>
			{data?.transactions.length === 0 && (
				<p className="text-2xl font-bold text-center w-full"> No Transaction History Found.</p>
			)}
		</div>
	);
};

export default Cards;
