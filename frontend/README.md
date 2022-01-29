# blegram - 프론트

## 1. 설명
`create-next-app`을 사용하지 않고 직접 필요한 부분 구현 및 `next.config.js`도 필요한 부분 수정해서 사용

## 2. 가이드 라인
- 종속성 설치
```bash
$ npm install
```

+ `.env.production` / `.env.development` 생성
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
```
# 개발용
$ npm run dev

# 배포용
$ sudo pm2 start npm -- start
```

## 3. 기술 스택
1. `React.js` ( `SPA` 및 `JSX` 등 쉬운 문법과 다양한 메서드를 위해 사용 )
2. `Next.js` ( `UX`향상과 `SEO`를 위해서 사용 )
3. `styled-components` ( `CSS-In-Js` 방식을 사용 )
4. `redux`, `redux-saga` ( 상태관리와 상태관리의 비동기 요청 + 유용한 이펙트 함수 사용 )
5. `axios` ( `Promise`기반 비동기 통신 라이브러리 )
5. `image-carousel` ( 라이브러리를 사용하지 않고 직접 제작해서 사용 )
6. `eslint/prettier` ( 코드 문법 검사 및 정리 도구로 사용 )
7. `.svg` ( 어도비 일러스트레이터를 이용해서 직접 제작 후 사용 )
