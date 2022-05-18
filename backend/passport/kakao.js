import passport from "passport";
import { Strategy as KakaoStrategy } from "passport-kakao";
import db from "../models/index.js";

const { User, Photo } = db;

const passportKakaoConfig = () =>
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_KEY,
        callbackURL: "/auth/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const { id: snsId, provider, username: name } = profile;
        const { profile_image_url: url } = JSON.parse(profile._raw).kakao_account.profile;

        try {
          const exUser = await User.findOne({
            where: {
              snsId,
              provider,
              name,
            },
          });

          if (exUser) {
            // 프로필 이미지가 변경될 가능성이 높으니 로그인할 때마다 새로 업데이트
            await Photo.update(
              { url },
              {
                where: {
                  UserId: exUser._id,
                },
              },
            );

            return done(null, { user: exUser, accessToken });
          } else {
            const createdUser = await User.create({
              snsId,
              provider,
              name,
            });

            await Photo.create({
              url,
              UserId: createdUser._id,
            });
            return done(null, { user: createdUser, accessToken });
          }
        } catch (error) {
          done(error);
        }
      },
    ),
  );

export default passportKakaoConfig;
