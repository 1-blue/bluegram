# bluegram
- [bluegram 사이트](https://bluegram.cf/)
- [velog 일지](https://velog.io/@1-blue/series/bluegram)
- [youtube](https://www.youtube.com/watch?v=gUUmwcein7M)
- [trello](https://trello.com/b/jBz14zzw/bluegram)

## 1. 설명
공부용으로 만든 인스타그램 클론 웹사이트  
`React.js`, `Node.js`, `Mysql`, `AWS`를 이용해서 구현

### 1.1 version 1.0.0
+ 구현한 기능
  1. 유저 CRUD
  2. 로그인 ( local, kakao )
  3. 게시글 CRD ( 영상처리 불가능 )
  4. 댓글/답글 CRD
  5. 게시글/댓글/답글의 좋아요 CRD
  6. 팔로잉/팔로워/팔로우 CRD
  7. 해시태그 CRD ( + 검색 )
  8. 게시글 무한 스크롤링
  9. image-carousel
  10. bookmark
  11. 내 게시글들 보기

- 이후에 업데이트할 기능들
  1. 게시글 업데이트
  2. 유저 태그
  3. 유저 알림
  4. DM
  5. image-resizing
  6. image-crop

## 2. 제작환경
1. OS: `Window11`
2. editor: `VSCode`, `Sourcetree`
3. terminal: `git bash`
4. Database: `docker` - `mysql-server`
5. vcs: `Git` / `GitHub`
6. Front: `React.js`
7. Back: `Node.js`
8. 배포: `AWS EC2 ubuntu 20.04`

## 3. 가이드라인
### 3.1 프론트엔드
- 종속성 설치
```bash
$ cd frontend
$ npm install
```

- `.env.production` 생성
```
SERVER_URL=
SERVER_IMAGE_URL=
SERVER_KAKAO_URL=
```

- 빌드
```
$ npm run build
```

### 3.2 백엔드
- 종속성 설치
```bash
$ cd backend
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
