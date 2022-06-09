# 🐲 blegram - 프론트엔드
`Next.js` + `TypeScript`를 이용하고, 상태 관리로는 `Redux`와 `Redux-Saga`를 사용하고, 스타일은 `styled-components`를 이용해서 처리합니다.
또한 배포는 `AWS-EC2`를 이용해서 무료로 배포했습니다.

<section align="center">
  <h2 style="text-align: center; margin: 0;">🛠️ 사용 라이브러리 🛠️</h2>
  <img src="https://img.shields.io/badge/Next.js-818CF8?style=flat-square&logo=Next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/styledComponents-DB7093?style=flat-square&logo=styled-components&logoColor=white" />
  <img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white" />
  <img src="https://img.shields.io/badge/ReduxSaga-999999?style=flat-square&logo=Redux-Saga&logoColor=white" />
  <img src="https://img.shields.io/badge/AmazonS3-569A31?style=flat-square&logo=AmazonS3&logoColor=white" />
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

# 👇 가이드라인
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