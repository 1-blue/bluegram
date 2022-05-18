import express from "express";

const router = express.Router();

import { upload } from "../aws/index.js";

router.post("/", upload.array("photos"), (req, res) => {
  res.json({
    ok: true,
    message: "AWS S3에 이미지를 업로드 성공했습니다.",
    photos: req.files.map(file => file.key),
  });
});

// // 2022/01/14 - 특정 프리뷰 제거 - by 1-blue
// router.delete("/:preview", upload.array("images"), (req, res, next) => {
//   const preview = req.params.preview;

//   try {
//     const oldPath = path.join(__dirname, "public", "images", "preview", preview);
//     const newPath = path.join(__dirname, "public", "images", "deleted", preview);
//     fs.renameSync(oldPath, newPath, () => {});
//   } catch (error) {
//     console.error("DELETE /api/image error >> ", error);
//     next(error);
//   }

//   res.status(200).json({ message: "특정 프리뷰를 제거했습니다.", preview });
// });

export default router;
