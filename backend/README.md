# 🐲 blegram - 백엔드
`Node.js`의 `express`를 이용한 서버를 구현했습니다.

추가적으로 `sequlize`를 이용해서 `DB`를 관리하고, `passport`를 이용해서 인증처리를 하고, `socket.io`를 이용해서 채팅처리, `aws-s3`에 이미지를 업로드합니다.

<section align="center">
  <h2 style="text-align: center; margin: 0;">🛠️ 사용 라이브러리 🛠️</h2>
  <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white" />
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=flat-square&logo=Sequelize&logoColor=white" />
  <img src="https://img.shields.io/badge/Passport-34E27A?style=flat-square&logo=Passport&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=Socket.io&logoColor=white" />
  <img src="https://img.shields.io/badge/AmazonS3-569A31?style=flat-square&logo=AmazonS3&logoColor=white" />
    <img src="https://img.shields.io/badge/AmazonAWS-232F3E?style=flat-square&logo=AmazonAWS&logoColor=white" />
</section>


# 👇 가이드 라인
- 종속성 설치
```bash
npm install

# npx 가능하다면 설치 안 해도 됨
npm install -g pm2
```

- `.env` 생성
```
NODE_ENV=<작성>
COOKIE_SECRET=<작성>
DATABASE_NAME=<작성>
DATABASE_USER_NAME=<작성>
DATABASE_PASSWORD=<작성>
DATABASE_HOST=<작성>
KAKAO_KEY=<작성>

BLEGRAM_AWS_REGION=<작성>
BLEGRAM_AWS_ACCESS_KEY=<작성>
BLEGRAM_AWS_SECRET_KEY=<작성>
```

- 실행
```bash
npm start
pm2 log
pm2 monit

# npx 가능하다면
npx pm2 start app.js
npx pm2 log
npx pm2 monit
```

# 🛠️ 기술 스택
1. `express` ( `Node.js`를 서버로 사용하기 위해 이용 )
2. `cors` ( `cors`를 간단하게 해결하기 위해 사용 )
3. `multer` ( `multipart/form-data`를 처리 즉, 이미지 처리를 위해 사용 )
4. `passport` ( local 로그인 및 OAuth를 위해 사용 ( kakao, naver, facebook ) )
5. `sequelize` ( `ORM`방식으로 `DB`를 조작하기 위해 사용 )
6. `multer-s3`, `aws-sdk` ( `AWS-S3`를 이용해서 정적 이미지를 호스팅하기 위해 사용 )
7. `socket.io` ( 1 : 1 채팅 구현을 위해 사용 )

# 🔎 passport 동작 방식
+ local 전략
  1. 프론트에서 `id`, `pw`를 첨부해서 서버로 로그인 요청 보냄
  2. 서버에서 `id`와 `pw`로 유효성 검사
  3. 성공 시 서버의 세션에 유저의 식별자 저장 + 브라우저에게 세션의 식별값이 담긴 쿠키 전송 ( `auth-blegram` )
  4. 이후 요청마다 브라우저에서 쿠키를 같이 보냄
  5. 엔드 포인트 들어가기 전에 미들웨어로 쿠키 -> 세션 -> 유저의 식별자 순서로 찾음
  6. 유저의 식별자를 이용해서 `DB`에서 전체 유저 정보를 찾고 `req.user`에 넣어줌
  7. `req.user`의 존재로 인해서 `stateless`인 서버에서 로그인 유지를 할 수 있게 됨