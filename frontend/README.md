# bluegram - 프론트

## 1. 설명
`create-react-app`을 사용하지 않고 직접 `webpack.config.js`를 생성해서 구현

## 2. 가이드 라인
- 종속성 설치
```bash
$ npm install
```

+ `.env.production` / `.env.development` 생성
```
SERVER_URL=
SERVER_IMAGE_URL=
SERVER_KAKAO_URL=
```

- 빌드 / 데브서버
```
$ npm run build
$ npm run dev
```

## 3. 기술 스택
1. `React.js` ( `SPA` 및 `JSX` 등 쉬운 문법과 다양한 메서드를 위해 사용 )
2. `react-router-dom` ( `SPA`의 라우팅을 위해 사용 )
3. `styled-components` ( `CSS-In-Js` 방식을 사용 )
4. `redux`, `redux-saga` ( 상태관리와 상태관리의 비동기 요청 + 유용한 이펙트 함수 사용 )
5. `axios` ( `Promise`기반 비동기 통신 라이브러리 )
5. `image-carousel` ( 라이브러리를 사용하지 않고 직접 제작해서 사용 )
6. `eslint/prettier` ( 코드 문법 검사 및 정리 도구로 사용 )
7. `.svg` ( 어도비 일러스트레이터를 이용해서 직접 제작 후 사용 )
