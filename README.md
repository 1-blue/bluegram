# 🐲 blegram
공부를 목적으로 만든 인스타그램 클론 웹사이트입니다.

- [blegram 사이트](https://blegram.com/)
- [velog 일지](https://velog.io/@1-blue/series/bluegram)
- [youtube](https://www.youtube.com/watch?v=gUUmwcein7M)
- [trello](https://trello.com/b/jBz14zzw/bluegram)

> 현재 프론트와 백엔드 두 개의 서버를 돌려서 한 달에 15일만 무료로 사용할 수 있기 때문에 매달 1일 ~ 15일 까지만 서버가 열려있을 수 있습니다.

<section align="center">
  <h2 style="text-align: center; margin: 0;">🛠️ 사용 라이브러리 🛠️</h2>
  <img src="https://img.shields.io/badge/Next.js-818CF8?style=flat-square&logo=Next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/styledComponents-DB7093?style=flat-square&logo=styled-components&logoColor=white" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat-square&logo=Redux&logoColor=white" />
  <img src="https://img.shields.io/badge/ReduxSaga-999999?style=flat-square&logo=Redux-Saga&logoColor=white" />
  <img src="https://img.shields.io/badge/AmazonS3-569A31?style=flat-square&logo=AmazonS3&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white" />
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=flat-square&logo=Sequelize&logoColor=white" />
  <img src="https://img.shields.io/badge/Passport-34E27A?style=flat-square&logo=Passport&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=Socket.io&logoColor=white" />
  <img src="https://img.shields.io/badge/AmazonAWS-232F3E?style=flat-square&logo=AmazonAWS&logoColor=white" />
</section>

<section align="center">
  <h2 style="text-align: center; margin: 0;">💁‍♂️ 사용 툴 🙋‍♂️</h2>
  <a href="https://trello.com/b/AT4Z2NOe/blemarket">
    <img src="https://img.shields.io/badge/Trello-0052CC?style=flat-square&logo=Trello&logoColor=white" />
  </a>
  <a href="https://velog.io/@1-blue/series/blemarket">
    <img src="https://img.shields.io/badge/Velog-20C997?style=flat-square&logo=Velog&logoColor=white" />
  </a>
  <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=Git&logoColor=white" />
  <a href="https://github.com/1-blue/blemarket">
    <img src="https://img.shields.io/badge/GitHub-609926?style=flat-square&logo=GitHub&logoColor=white" />
  </a>
  <img src="https://img.shields.io/badge/Sourcetree-0052CC?style=flat-square&logo=Sourcetree&logoColor=white" />
  <img src="https://img.shields.io/badge/VsCode-007ACC?style=flat-square&logo=VisualStudioCode&logoColor=white" />
</section>

# 🙌 구현 기능
1. 유저 CRUD
2. 로그인/회원가입 ( local )
3. 게시글 CRD ( 영상처리 불가능 )
4. 댓글/답글 CRD
5. 게시글/댓글/답글의 좋아요 CRD
6. 팔로잉/팔로우 CRD
7. 해시태그 CRD ( + 검색 )
8. 게시글 무한 스크롤링
9. DM ( 1 : 1 채팅 )
10. 게시글 북마크
11. 내 게시글들 보기 ( 업로드한 게시글, 북마크된 게시글 )

# 🛠️ 제작환경
1. OS: `Window11`
2. editor: `VSCode`, `Sourcetree`
3. terminal: `git bash`
4. Database: `docker` - `mysql-server`
5. vcs: `Git` / `GitHub`
6. Front: `Next.js`
7. Back: `Node.js`
8. 배포: `AWS EC2 ubuntu 20.04`

# 👇 가이드라인
## 1. 프론트엔드
- 종속성 설치
```bash
cd frontend
npm install

# npx 가능하다면 설치 안 해도 됨
sudo npm install -g pm2
```

- `.env.development`, `.env.production` 생성
```
NEXT_PUBLIC_SERVER_URL=<작성>
NEXT_PUBLIC_PHOTO_URL=<작성>
NEXT_PUBLIC_FRONT_URL=<작성>
```

- 빌드
```bash
npm run build
```

- 실행
```bash
# 개발 시
npm run dev

# 배포 시
pm2 start npm -- start
```

## 2. 백엔드
- 종속성 설치
```bash
cd backend
npm install

# npx 가능하다면 설치 안 해도 됨
sudo npm install -g pm2
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
sudo npm start
sudo pm2 log
sudo pm2 monit

# npx 가능하다면
sudo npx pm2 start app.js
sudo npx pm2 log
sudo npx pm2 monit
```

# 📽️ 실행 영상
## 1. 인피니티 스크롤링
<img src="https://user-images.githubusercontent.com/63289318/172258740-bdc93fc5-05be-4831-888d-a5c32eb823fb.gif" width="100%" />

## 2. 이미지 캐루셀
<img src="https://user-images.githubusercontent.com/63289318/172258719-5ee3176c-f447-4ac3-946b-00aee979e0a3.gif" width="100%" />

## 3. 댓글/답글
<img src="https://user-images.githubusercontent.com/63289318/172258727-86f76f73-e4d2-400a-9f07-58e7f47db586.gif" width="100%" />

## 4. 좋아요/북마크/팔로우/언팔로우
<img src="https://user-images.githubusercontent.com/63289318/172258733-1b63207f-4937-4eb2-9a5d-81f1cdb3e226.gif" width="100%" />

## 5. 채팅
<img src="https://user-images.githubusercontent.com/63289318/172258726-092bbe88-3969-49cf-a118-9d8456122b2c.gif" width="100%" />

## 6. 나의 프로필 페이지
<img src="https://user-images.githubusercontent.com/63289318/172258747-53ea1155-2708-49cd-8f73-37a1f5e0817b.gif" width="100%" />

## 7. 해시태그 검색
<img src="https://user-images.githubusercontent.com/63289318/172258753-f614fbd3-5035-4773-9609-8de3a66ea105.gif" width="100%" />
