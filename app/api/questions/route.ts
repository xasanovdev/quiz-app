// app/api/questions/route.ts

import { questions } from "@/public/data/questions";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(questions);
}
