# 1. auth
## 1.1 POST /auth
+ 역할: 로그인 요청
+ 전송 데이터: `{ id, passowrd }`
+ 응답 데이터: `{ message }`
+ 응답 코드
  1. `200`: 로그인 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 로그인 후 접근
  4. `403`: 유효하지 않은 사용자

## 1.2 DELETE /auth
+ 역할: 로그아웃 요청
+ 전송 데이터: -
+ 응답 데이터: `{ message }`
+ 응답 코드
  1. `200`: 로그아웃 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근

# 2. user
## 2.1 GET /user/me
+ 역할: 로그인한 유저의 정보 가져오기
+ 전송 데이터: -
+ 응답 데이터:
```javascript
{
  _id,
  name,
  Image: {
    _id,
    name
  },
  Followers: [
    { _id },
    // ...
  ],
  Followings: [
    { _id },
    // ...
  ],
}
```
+ 응답 코드
  1. `200`: 로그인한 유저 데이터 응답 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근

## 2.2 GET /user/:UserId
+ 역할: 특정 유저의 정보 가져오기
+ 전송 데이터: ( params를 이용한 유저의 식별자 )
+ 응답 데이터:
```javascript
{
  _id,
  name,
  Image: {
    _id,
    name
  },
  Followers: [
    {
      User: {
        _id,
        name,
        Image: {
          _id,
          name
        },
      }
    },
    // ...
  ],
  Followings: [
    {
      User: {
        _id,
        name,
        Image: {
          _id,
          name
        },
      }
    },
    // ...
  ],
}
```
+ 응답 코드
  1. `200`: 특정 유저의 정보에 대한 응답 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근

## 2.3 POST /user
+ 역할: 회원가입
+ 전송 데이터: `{ id, password, name, phone, birthday, imageName }`
+ 응답 데이터: `{ message }`
+ 응답 코드
  1. `201`: 회원가입 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근
  4. `409`: 이미 가입된 아이디

## 2.4 PATCH /user
+ 역할: 회원 정보 수정
+ 전송 데이터: `{ id, password, name, phone, birthday, imageName }` 중에 일부분 혹은 전체
+ 응답 데이터: `{ message }`
+ 응답 코드
  1. `200`: 회원 정보 수정 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근

# 3. image
## 3.1 POST /image
+ 역할: 이미지 생성 ( 프로필이미지, 게시글이미지 )
+ 전송 데이터: `multipart/form-data`형식 `image`로 이미지(들) 전달
+ 응답 데이터: `["이미지 이름"]`
+ 응답 코드
  1. `201`: 이미지 생성 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근

# 4. post
## 4.1 GET /post?lastId=?
+ 역할: 게시글 목록 불러오기
+ 전송 데이터: query를 이용한 `lastId`(마지막 게시글의 아이디)를 전송
+ 응답 데이터
```javascript
[
  {
    _id,
    content,
    User: {
      _id,
      name,
      Image: {
        _id,
        name
      },
    },
    Liker: [
      { _id },
      // ...
    ],
    commentCount
  },
  // ...
]
```
+ 응답 코드
  1. `200`: 게시글 불러오기 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근

## 4.2 POST /post
+ 역할: 게시글 생성
+ 전송 데이터: `{ content }`
+ 응답 데이터: `게시글 생성에 성공하셨습니다.`
+ 응답 코드
  1. `201`: 게시글 생성 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근

## 4.3 PATCH /post
+ 역할: 게시글 수정
+ 전송 데이터: `{ PostId, content }`
+ 응답 데이터: `{ message }`
+ 응답 코드
  1. `200`: 게시글 수정 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근

## 4.4 GET /delete/:PostId
+ 역할: 게시글 삭제
+ 전송 데이터: params를 이용한 `PostId`를 받아서 삭제
+ 응답 데이터: `{ message }`
+ 응답 코드
  1. `200`: 게시글 삭제 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근

# 5. comment
## 5.1 GET /comment/:PostId
+ 역할: 댓글 목록 불러오기
+ 전송 데이터: params로 `PostId`를 전송
+ 응답 데이터
```javascript
[
  {
    _id,
    content,
    User: {
      _id,
      name,
      Image: {
        _id,
        name
      },
    }
  },
  // ...
]
```
+ 응답 코드
  1. `200`: 댓글 불러오기 성공
  2. `500`: 서버측 에러 ( 원인불명 )

## 5.2 POST /comment
+ 역할: 댓글 or 답글 생성
+ 전송 데이터: `{ PostId, content, CommentId }`
+ 응답 데이터: `{ message }`
+ 응답 코드
  1. `200`: 댓글 or 답글 생성 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근

## 5.3 DELETE /comment/:PostId
+ 역할: 댓글 삭제
+ 전송 데이터: params로 `PostId` 전송
+ 응답 데이터: `{ message }`
+ 응답 코드
  1. `200`: 댓글 불러오기 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근

# 6. following
## 6.1 GET /following/:UserId?lastId=?
+ 역할: 팔로잉 가져오기
+ 전송 데이터: params로 `UserId` 전송, query로 `lastId` 전송
+ 응답 데이터
```javascript
[
  {
    _id,
    name,
    Image: {
      _id,
      name
    }
  },
  // ...
]
```
+ 응답 코드
  1. `200`: 팔로잉 가져오기 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근

## 6.2 Post /following
+ 역할: 팔로잉 추가하기
+ 전송 데이터: `{ UserId }`
+ 응답 데이터: `{ message }`
+ 응답 코드
  1. `200`: 팔로잉 추가하기 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근

## 6.3 DELETE /following
+ 역할: 팔로잉 삭제
+ 전송 데이터: `{ UserId }`
+ 응답 데이터: `{ message }`
+ 응답 코드
  1. `200`: 팔로잉 삭제
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근

# 7. follower
## 7.1 GET /follower/:UserId?lastId=?
+ 역할: 팔로워 가져오기
+ 전송 데이터: params로 `UserId` 전송, query로 `lastId` 전송
+ 응답 데이터
```javascript
[
  {
    _id,
    name,
    Image: {
      _id,
      name
    }
  },
  // ...
]
```
+ 응답 코드
  1. `200`: 팔로워 가져오기 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근

## 7.2 DELETE /follower
+ 역할: 팔로워 삭제
+ 전송 데이터: `{ UserId }`
+ 응답 데이터: `{ message }`
+ 응답 코드
  1. `200`: 팔로워 삭제 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근

# 8. like
## 8.1 POST /like/:PostId
+ 역할: 좋아요 추가
+ 전송 데이터: params로 `PostId` 전송
+ 응답 데이터: `{ message }`
+ 응답 코드
  1. `200`: 좋아요 추가 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근

## 8.2 DELETE /like/:PostId
+ 역할: 좋아요 삭제
+ 전송 데이터: params로 `PostId` 전송
+ 응답 데이터: `{ message }`
+ 응답 코드
  1. `200`: 좋아요 삭제 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근

# 9. hashtag
## 9.1 GET /hashtag/:hashtagName
+ 역할: 해시태그를 작성한 게시글들 가져오기
+ 전송 데이터: params로 `hashtagName` 전송
+ 응답 데이터
```javascript
[
  {
    _id,
    content,
    User: {
      _id,
      name,
      Image: {
        _id,
        name
      }
    },
    Liker: [
      { _id },
      // ...
    ],
    commentCount,
  },
  // ...
]
```
+ 응답 코드
  1. `200`: 해시태그를 등록한 게시글 불러오기 성공
  2. `500`: 서버측 에러 ( 원인불명 )