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

export default router;
