# blegram
- [blegram 사이트](https://blegram.com/)
- [velog 일지](https://velog.io/@1-blue/series/bluegram)
- [youtube](https://www.youtube.com/watch?v=gUUmwcein7M)
- [trello](https://trello.com/b/jBz14zzw/bluegram)

## 1. 설명
공부용으로 만든 인스타그램 클론 웹사이트  
`Next.js`(`React.js`), `Node.js`, `Mysql`, `AWS`를 이용해서 구현

### 1.1 version 1.0.0
+ 구현한 기능
  1. 유저 CRUD
  2. 로그인 ( local )
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
  1. 게시글 업로드 이미지 순서 변경
  2. 게시글 업로드 이미지 크롭
  3. 게시글 업로드 이미지 리사이징
  4. 게시글 업로드 이미지 저장 위치 변경 ( 현재는 백엔드 서버에 저장 )
  5. 좋아요 및 팔로우 시 알림
  6. DM
  7. ImageCarousel 드래그로 이미지 넘기기
  8. 유저 검색 추가
  9. 검색 시 추천 검색어 보여주기
  10. 팔로우 시 인기 유저 보여주기

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
NEXT_PUBLIC_NODE_ENV=
NEXT_PUBLIC_SERVER_URL=
NEXT_PUBLIC_IMAGE_URL=
NEXT_PUBLIC_PREVIEW_IMAGE_URL=
NEXT_PUBLIC_KAKAO_URL=
```

- 빌드
```bash
$ npm run build
```

- 실행
```bash
# 개발 시
$ sudo npm run dev

# 배포 시
$ sudo pm2 start npm -- start
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