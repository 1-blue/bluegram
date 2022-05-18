// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { getDummyPosts } from "@src/libs/dummy";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      const lastId = +req.query.lastId;
      const limit = +req.query.limit;

      return res
        .status(200)
        .json({ limit: 15, posts: getDummyPosts({ lastId, limit }) });

    default:
      return res.status(200).json({ ok: true });
  }
}
