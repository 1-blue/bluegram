# bluegram - 백

## 1. 설명
`Node.js`의 `express`를 이용한 서버 구현

## 2. 가이드 라인
- 종속성 설치
```bash
$ npm install

# npx 가능하다면 설치 안 해도 됨
$ npm install -g pm2
```

- `.env` 생성
```
COOKIE_SECRET=
DATABASE_NAME=
DATABASE_USER_NAME=
DATABASE_PASSWORD=
DATABASE_HOST=
KAKAO_KEY=
CLIENT_URL=
```

- 실행
```bash
$ sudo npm start
$ sudo pm2 log
$ sudo pm2 monit

# npx 가능하다면
$ sudo npx pm2 start app.js
$ sudo npx pm2 log
$ sudo npx pm2 monit
```

## 3. 기술 스택
1. `express` ( `Node.js`를 서버로 사용하기 위해 이용 )
2. `cors` ( `cors`를 간단하게 해결하기 위해 사용 )
3. `multer` ( `multipart/form-data`를 처리 즉, 이미지 처리를 위해 사용 )
4. `passport` ( local 로그인 및 OAuth를 위해 사용 ( kakao, naver, facebook ) )
5. `sequelize` ( `ORM`방식으로 `DB`를 조작하기 위해 사용 )

## 4. passport 동작 방식
+ local 전략
  1. 프론트에서 `id`, `pw`를 첨부해서 서버로 로그인 요청 보냄
  2. 서버에서 `id`와 `pw`로 유효성 검사
  3. 성공 시 서버의 세션에 유저의 식별자 저장 + 브라우저에게 세션의 식별값이 담긴 쿠키 전송 ( `auth-bluegram` )
  4. 이후 요청마다 브라우저에서 쿠키를 같이 보냄
  5. 엔드 포인트 들어가기 전에 미들웨어로 쿠키 -> 세션 -> 유저의 식별자 순서로 찾음
  6. 유저의 식별자를 이용해서 `DB`에서 전체 유저 정보를 찾고 `req.user`에 넣어줌
  7. `req.user`의 존재로 인해서 `stateless`인 서버에서 로그인 유지를 할 수 있게 됨