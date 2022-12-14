// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	name: string;
};

const getName = (name: string) => name;

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	console.log("res", res);
	res.status(200).json({ name: getName("John Doe") });
}
