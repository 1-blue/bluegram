import { IPostWithData } from "@src/type";

export const getDummyPosts = ({
  lastId,
  limit,
}: {
  lastId: number;
  limit: number;
}): IPostWithData[] => {
  if (lastId > 30) {
    return Array(5)
      .fill(null)
      .map((v, i) => ({
        _id: i + lastId,
        content: "게시글" + (i + lastId),
        Photos: [
          {
            _id: -1,
            name: "venice.jpg",
          },
        ],
      }));
  }
  return Array(limit)
    .fill(null)
    .map((v, i) => ({
      _id: i + lastId,
      content: "게시글" + (i + lastId),
      Photos: [
        {
          _id: -1,
          name: "venice.jpg",
        },
        {
          _id: -2,
          name: "venice.jpg",
        },
      ],
    }));
};
