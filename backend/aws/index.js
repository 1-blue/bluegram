import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

AWS.config.update({
  region: process.env.BLEGRAM_AWS_REGION,
  accessKeyId: process.env.BLEGRAM_AWS_ACCESS_KEY,
  secretAccessKey: process.env.BLEGRAM_AWS_SECRET_KEY,
});

const S3 = new AWS.S3();

export default S3;

// 이미지 생성 경로 얻는 헬퍼 함수
export const getPhotoPath = filename => `images/${process.env.NODE_ENV}/${filename}_${Date.now()}`;

// multer와 multer-s3를 이용한 이미지 생성
export const upload = multer({
  storage: multerS3({
    s3: S3,
    bucket: "blegram",
    key(req, file, cb) {
      const filename = file.originalname.split(".")[0];
      cb(null, getPhotoPath(filename));
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 1mb
});

// S3 이미지 제거
export const deletePhoto = photo =>
  S3.deleteObject(
    {
      Bucket: "blegram",
      Key: photo,
    },
    (error, data) => {
      if (error) {
        console.error("error >> ", error);
      }
    },
  );

// S3 이미지 이동
export const copyPhoto = originalSource =>
  S3.copyObject(
    {
      Bucket: "blegram",
      CopySource: "blegram/" + originalSource,
      Key:
        originalSource.slice(0, originalSource.lastIndexOf("/")) +
        "/remove" +
        originalSource.slice(originalSource.lastIndexOf("/")),
    },
    (error, data) => {
      if (error) {
        console.error("error >> ", error);
      }
    },
  );
