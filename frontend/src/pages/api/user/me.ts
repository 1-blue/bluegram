// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      return res.status(200).json(null);
      return res.status(200).json({
        _id: 0,
        name: "관리자",
      });

    default:
      return res.status(200).json({ ok: true });
  }
}
