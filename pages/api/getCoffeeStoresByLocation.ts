// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchCoffeeStores } from "../../lib/coffee-store";

type Data = Record<string, unknown>;

const getName = (name: string) => name;

export default async function getCoffeeStoresByLocation(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	try {
		// Get parameters from request query params
		const { latLong, query, limit } = req.query;
		const response = await fetchCoffeeStores(
			latLong as string,
			query as string,
			limit as string
		);
		console.log("api query params", latLong, query, limit);
		res.status(200).json(response);
	} catch (error) {
		console.error(`There has an error`, error);
		res.status(500).json({ message: "There is an error", error });
	}
}
