// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Response = {
  ok: boolean;
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { method } = req;

  switch (method) {
    case "POST":
      console.log("post 요청 >> ", req.body);
      break;
    case "DELETE":
      console.log("DELETE 요청 >> ", req.body);
      break;

    default:
      break;
  }

  res.status(200).json({ ok: true, name: "apple" });
}
