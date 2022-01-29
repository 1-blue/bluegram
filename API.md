# 1. auth
## 1.1 POST /auth
+ 역할: 로그인 요청
+ 전송 데이터: `{ id, passowrd }`
+ 응답 데이터
```javascript
{
  _id,
  name,
  // 유저의 프로필 이미지
  Images: [{ _id, name, url }],
  // 유저의 게시글 ( 개수를 위해서 )
  Posts: [{ _id }],
  // 유저의 팔로워들 ( 개수를 위해서 )
  Followers: [{ _id }],
  // 유저의 팔로잉들 ( 개수를 위해서 )
  Followings: [{ _id }],
}
```
+ 응답 코드
  1. `200`: 로그인 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 로그인 접근
  4. `403`: 유효하지 않은 사용자

## 1.2 DELETE /auth
+ 역할: 로그아웃 요청
+ 전송 데이터: `-`
+ 응답 데이터: `{ message }`
+ 응답 코드
  1. `200`: 로그아웃 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근

# 2. user
## 2.1 GET /user/me
+ 역할: 로그인한 유저의 정보 가져오기
+ 전송 데이터: `-`
+ 응답 데이터:
```javascript
{
  message,
  user: {
    _id,
    name,
    // 유저의 프로필 이미지
    Images: [{ _id, name }],
    // 유저의 게시글들 ( 개수를 위해서 )
    Posts: [{ _id }],
    // 유저의 팔로워들 ( 개수를 위해서 )
    Followers: [{ _id }],
    // 유저의 팔로잉들 ( 개수를 위해서 )
    Followings: [{ _id }],
  }
}
```
+ 응답 코드
  1. `200`: 로그인한 유저 데이터 응답 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근

## 2.2 GET /user/me/detail
+ 역할: 로그인한 유저의 상세 정보 가져오기
+ 전송 데이터: `-`
+ 응답 데이터:
```javascript
{
  message,
  me: {
    _id,
    name,
    provider,
    phone,
    birthday,
    // 유저의 프로필 이미지
    Images: [{ _id, name, url }]
  }
}
```
+ 응답 코드
  1. `200`: 로그인한 유저 데이터 응답 성공
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

## 2.4 GET /user/:UserId
+ 역할: 특정 유저의 정보 가져오기
+ 전송 데이터: params으로 `UserId`
+ 응답 데이터:
```javascript
{
  message,
  user: {
    _id,
    name,
    // 유저의 프로필 이미지
    Images: [{ _id, name }],
    // 유저의 게시글들 ( 개수를 위해서 )
    Posts: [{ _id }],
    // 유저의 팔로워들 ( 개수를 위해서 )
    Followers: [{ _id }],
    // 유저의 팔로잉들 ( 개수를 위해서 )
    Followings: [{ _id }],
  }
}
```
+ 응답 코드
  1. `200`: 특정 유저의 정보에 대한 응답 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근
  4. `404`: 유저가 존재하지 않음

## 2.5 PUT /user
+ 역할: 로그인한 유저의 기본 정보 수정
+ 전송 데이터: `{ name, email, phone, birthday, about, imageName }`
+ 응답 데이터
```javascript
{
  message,
  result: {
    name,
    email,
    phone,
    birthday,
    about,
    profileImage
  },
}
```
+ 응답 코드
  1. `200`: 회원 정보 수정 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근

## 2.5 PATCH /user
+ 역할: 로그인한 유저의 비밀번호 정보 변경
+ 전송 데이터: `{ currentPassword, password }`
+ 응답 데이터
```javascript
// 서버의 세션 제거
// 클라이언트의 쿠키 제거
{
  message
}
```
+ 응답 코드
  1. `200`: 비밀번호 변경 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근
  4. `202`: 기존 비밀번호 불일치

## 2.6 DELETE /user
+ 역할: 로그인한 유저의 회원탈퇴
+ 전송 데이터: params로 `passowrd` 전송
+ 응답 데이터
```javascript
// 서버의 세션 제거
// 클라이언트의 쿠키 제거
{
  message
}
```
+ 응답 코드
  1. `200`: 회원탈퇴 성공
  2. `202`: 비밀번호 불일치
  3. `500`: 서버측 에러 ( 원인불명 )
  4. `401`: 비로그인 접근

# 3. image
## 3.1 POST /image
+ 역할: 이미지 생성 ( 프로필이미지, 게시글이미지 )
+ 전송 데이터: `multipart/form-data`형식 `image`로 이미지(들) 전달
+ 응답 데이터
```javascript
{
  message,
  images: ["이미지이름"]
}
```
+ 응답 코드
  1. `201`: 이미지 생성 성공
  2. `500`: 서버측 에러 ( 원인불명 )

## 3.2 DELETE /image/:preview
+ 역할: 프리뷰 제거
+ 전송 데이터: params, 프리뷰 이름
+ 응답 데이터
```javascript
{
  message,
  preview
}
```
+ 응답 코드
  1. `201`: 이미지 제거 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근

# 4. post
## 4.1 POST /post
+ 역할: 게시글 생성
+ 전송 데이터
```javascript
{
  content,
  images: ["이미지 이름"]
}
```
+ 응답 데이터
```javascript
{
  message,
  createdPost: {
    _id,
    content,
    createdAt,
    // 작성자
    User: {
      _id,
      name,
      // 작성자의 프로필 이미지
      Images: [{ _id, name, url }],
    },
    // 게시글의 이미지들
    Images: [{ _id, name }],
    // 게시글의 댓글들 ( 방금 생성한 게시글에 댓글이 있을 수 없으니 빈 배열 )
    Comments: [],
    // 게시글의 좋아요 ( 방금 생성한 게시글에 좋아요가 있을 수 없으니 빈 배열 )
    PostLikers: [],
  }
}
```
+ 응답 코드
  1. `201`: 게시글 생성 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근


## 4.2 GET /post/:PostId
+ 역할: 특정 게시글 상세 정보 불러오기
+ 전송 데이터: params로 `PostId` 전송
+ 응답 데이터
```javascript
// 정렬 기준은 게시글 생성 시간을 기준으로 오름차순 + 댓글들도 댓글 생성 시간을 기준으로 오름차순
// 추가적으로 답글은 제외하고 전송함
{
  message,
  post: {
    _id,
    content,
    createdAt,
    // 게시글 작성자
    User: {
      _id,
      name,
      // 게시글 작성자의 프로필 이미지
      Images: [{ _id, name, url }],
    },
    // 게시글의 이미지들
    Images: [{ _id, name }],
    // 게시글의 댓글들
    Comments: [{ _id }],
    // 게시글의 좋아요를 누른 유저 ( 개수파악과 본인이 좋아요 눌렀는지 여부 )
    PostLikers: [{
      _id,
      PostLikes: { createdAt }
    }],
  }
}
```
+ 응답 코드
  1. `200`: 게시글 삭제 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근
  4. `404`: 존재하지 않은 게시글 요청

## 4.3 DELETE /post/:PostId
+ 역할: 게시글 삭제
+ 전송 데이터: params로 `PostId` 전송
+ 응답 데이터
```javascript
{
  message,
  removedPostId,
}
```
+ 응답 코드
  1. `200`: 게시글 삭제 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근
  3. `404`: 존재하지 않은 게시글 삭제 요청

# 5. posts
## 5.1 GET /posts?lastId=❓limit=❓
+ 역할: 게시글들 불러오기
+ 전송 데이터: query로 `lastId`, `limit` 전달
+ 응답 데이터
```javascript
// 정렬 기준은 게시글 생성시간을 기준으로 오름차순
{
  message,
  posts: {
    _id,
    createdAt,
    // 게시글의 댓글들 ( 개수를 위해서 )
    Comments: [{ _id }],
    // 게시글의 좋아요 ( 개수를 위해서 )
    PostLikers: [
      {
        _id,
        PostLikes: { createdAt },
      },
    ],
  limit
}
```
+ 응답 코드
  1. `200`: 게시글들 불러오기 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근

## 5.2 GET /posts/detail?lastId=❓limit=❓
+ 역할: 게시글들 상세 내용 불러오기
+ 전송 데이터: query로 `lastId`, `limit` 전달
+ 응답 데이터
```javascript
// 정렬 기준은 게시글 생성시간을 기준으로 오름차순
{
  message,
  posts: {
    _id,
    content,
    createdAt,
    // 게시글의 작성자
    User: {
      _id,
      name,
      // 게시글 작성자의 프로필 이미지
      Images: [{ _id, name, url }]
    },
    // 게시글의 댓글들 ( 개수를 위해서 )
    Comments: [{ _id }],
    // 게시글의 좋아요 ( 개수를 위해서 )
    PostLikers: [
      {
        _id,
        PostLikes: { createdAt },
      },
    ],
  },
  limit,
}
```
+ 응답 코드
  1. `200`: 게시글들 불러오기 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근

## 5.3 GET /posts/user/:UserId?lastId=❓&limit=❓
+ 역할: 특정 유저의 게시글들 불러오기
+ 전송 데이터: params로 `UserId`, query로 `lastId`, `limit` 전송
+ 응답 데이터
```javascript
// 정렬 기준은 게시글 생성시간을 기준으로 오름차순
{
  message,
  posts: {
    _id,
    content,
    createdAt,
    // 게시글의 작성자
    User: {
      _id,
      name,
      // 게시글의 작성자의 프로필 이미지
      Images: [{ _id, name, url }]
    },
    // 게시글의 이미지들
    Images: [{ _id, name }],
    // 게시글의 댓글들 ( 개수를 위해서 )
    Comment: [{ _id }],
    // 게시글의 좋아요들 ( 개수를 위해서 )
    PostLikers: [{ _id }],
  },
  limit
}
```
+ 응답 코드
  1. `200`: 게시글 불러오기 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근

## 5.4 GET /posts/user/detail/:UserId?lastId=❓limit=❓
+ 역할: 특정 유저의 게시글들 상세 내용 불러오기
+ 전송 데이터: params으로 `UserID`, query로 `lastId`, `limit` 전달
+ 응답 데이터
```javascript
// 정렬 기준은 게시글 생성시간을 기준으로 오름차순
{
  message,
  posts: {
    _id,
    content,
    createdAt,
    // 게시글의 작성자
    User: {
      _id,
      name,
      // 게시글 작성자의 프로필 이미지
      Images: [{ _id, name, url }]
    },
    // 게시글의 댓글들 ( 개수를 위해서 )
    Comments: [{ _id }],
    // 게시글의 좋아요 ( 개수를 위해서 )
    PostLikers: [
      {
        _id,
        PostLikes: { createdAt },
      },
    ],
  },
  limit,
}
```
+ 응답 코드
  1. `200`: 게시글들 불러오기 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근

## 5.5 GET /posts/hashtag/:hashtagText
+ 역할: 해시태그에 해당하는 게시글들 불러오기
+ 전송 데이터: params로 `hashtagText`, query로 `lastId`, `limit` 전송
+ 응답 데이터
```javascript
{
  message,
  postsOfHashtag: {
    _id,
    createdAt,
    UserId,
    // 게시글 작성자
    User: {
      _id,
      name,
      // 게시글 작성자의 프로필 이미지
      Images: [{ _id, name, url }]
    },
    // 게시글의 이미지들
    Images: [{ _id, name }],
    // 게시글의 댓글들
    Comments: [{
      _id,
      content,
      UserId,
      RecommentId,
      createdAt,
      // 게시글의 댓글의 작성자
      User: {
        _id,
        name,
        // 게시글의 댓글의 작성자의 프로필 이미지
        Images: [{ _id, name }]
      },
      // 게시글의 댓글에 좋아요를 누른 유저들
      CommentLikers: [{
        _id,
        name,
        // 게시글의 댓글에 좋아요를 누른 유저의 프로필 이미지
        Images: [{ _id, name, url }],
        // 게시글의 댓글의 좋아요에 대한 정보
        CommentLikes: {
          createdAt,
          UserId,
          CommentId,
        }
      }],
      // 게시글의 댓글의 답글들 ( 개수를 위함 )
      Recomments: [{ _id }]
    }],
    // 게시글의 좋아요를 누른 유저 ( 개수파악과 본인이 좋아요 눌렀는지 여부 )
    PostLikers: [{
      _id,
      PostLikes: { createdAt }
    }],
  },
  limit,
  // 해시태그에 해당하는 게시글 총 개수
  postsOfHashtagCount,
  // 해시태그 내용
  hastagText
}
```
+ 응답 코드
  1. `200`: 정상적인 응답
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근
  4. `200`: 존재하는 해시태그 없음

# 6. comment
## 6.1 POST /comment/post
+ 역할: 댓글 or 답글 생성
+ 전송 데이터: `{ content, PostId, RecommentId }`
+ 응답 데이터
```javascript
{
  message,
  createdCommentWithData: {
    _id,
    content,
    createdAt,
    UserId,
    RecommentId,
    PostId,
    // 댓글 작성자
    User: {
      _id,
      name,
      // 댓글 작성자의 프로필 이미지
      Images: [{ _id, name, url }],
    },
    // 댓글의 답글 ( 방금 생성한 댓글에 답글이 존재할 수 없으므로 빈 배열 )
    Recomments: [],
    // 댓글의 좋아요 ( 방금 생성한 댓글에 좋아요가 존재할 수 없으므로 빈 배열 )
    CommentLikers: [],
  }
}
```
+ 응답 코드
  1. `200`: 댓글 or 답글 생성 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근
  4. `404`: 존재하지 않은 게시글에 댓글 추가 요청

## 6.2 DELETE /comment/post/:CommentId
+ 역할: 댓글 삭제
+ 전송 데이터: params로 `CommentId` 전송
+ 응답 데이터
```javascript
{
  message,
  removedCommentId,
  RemovedPostId,
  RecommentId
}
```
+ 응답 코드
  1. `200`: 댓글 불러오기 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근
  4. `404`: 존재하지 않은 게시글의 댓글 삭제 요청

## 6.3 GET /comment/post/:PostId?lastId=❓&limit=❓
+ 역할: 특정 게시글의 댓글 불러오기
+ 전송 데이터: params로 `PostId`, query로 `lastId`, `limit` 전송
+ 응답 데이터
```javascript
{
  message,
  Comments: {
    _id,
    content,
    createdAt,
    UserId,
    RecommentId,
    // 답글의 작성자
    User: {
      _id,
      name,
      // 답글의 작성자의 프로필 이미지
      Images: [{ _id, name }],
    },
    // 답글의 좋아요를 누른 유저
    CommentLikers: [{
      _id,
      name,
      CommentLikes: [{ createdAt }],
    }],
  }
  PostId,
  limit,
}
```
+ 응답 코드
  1. `200`: 답글들 불러오기 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근
  4. `404`: 존재하지 않은 댓글의 답글들 요청

## 6.4 GET /comment/comment/:CommentId?lastId=❓&limit=❓
+ 역할: 특정 댓글의 답글들 불러오기
+ 전송 데이터: params로 `CommentId`, query로 `lastId`, `limit` 전송
+ 응답 데이터
```javascript
{
  message,
  targetCommentId,
  Recomments: {
    _id,
    content,
    createdAt,
    UserId,
    RecommentId,
    // 답글의 작성자
    User: {
      _id,
      name,
      // 답글의 작성자의 프로필 이미지
      Images: [{ _id, name }],
    },
    // 답글의 좋아요를 누른 유저
    CommentLikers: [{
      _id,
      name,
      CommentLikes: [{ createdAt }],
    }],
  }
}
```
+ 응답 코드
  1. `200`: 답글들 불러오기 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근
  4. `404`: 존재하지 않은 댓글의 답글들 요청

# 7. follow
## 7.1 GET /follow/followers/:UserId
+ 역할: 특정 유저의 팔로워들 요청
+ 전송 데이터: params로 `UserId` 전송
+ 응답 데이터
```javascript
{
  message,
  followers: {
    _id,
    name,
    // 특정 유저의 팔로워들
    Follows: [{
      _id,
      name,
      // 팔로워의 프로필 이미지
      Images: [{ _id, name, url }]
    }]
  }
}
```
+ 응답 코드
  1. `200`: 팔로잉 가져오기 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근
  4. `404`: 존재하지 않는 유저의 팔로워 요청

## 7.2 GET /follow/followings/:UserId
+ 역할: 특정 유저의 팔로잉들 요청
+ 전송 데이터: params로 `UserId` 전송
+ 응답 데이터
```javascript
{
  message,
  followings: {
    _id,
    name,
    // 특정 유저의 팔로잉들
    Follows: [{
      _id,
      name,
      // 팔로잉의 프로필 이미지
      Images: [{ _id, name, url }]
    }]
  }
}
```
+ 응답 코드
  1. `200`: 팔로잉 가져오기 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근
  4. `404`: 존재하지 않는 유저의 팔로잉 요청

## 7.3 Post /follow/:UserId
+ 역할: 로그인한 유저가 팔로우 요청
+ 전송 데이터: params로 `UserId` 전송
+ 응답 데이터
```javascript
{
  message,
  followingId,
  followerId,
}
```
+ 응답 코드
  1. `200`: 팔로잉 추가하기 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근
  4. `409`: 이미 팔로우한 유저에게 팔로우 요청을 보낸 경우 or 본인에게 팔로우 요청을 보낸 경우
  5. `404`: 존재하지 않은 유저 팔로우 요청
  

## 7.4 DELETE /follow/:UserId
+ 역할: 로그인한 유저가 언팔로우 요청
+ 전송 데이터: params로 `UserId` 전송
+ 응답 데이터
```javascript
{
  message,
  followingId,
  followerId,
}
```
+ 응답 코드
  1. `200`: 팔로잉 추가하기 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근
  4. `409`: 이미 언팔로우한 유저에게 언팔로우 요청을 보낸 경우 or 본인에게 언팔로우 요청을 보낸 경우
  5. `404`: 존재하지 않은 유저 언팔로우 요청

# 8. like
## 8.1 POST /like/post/:PostId
+ 역할: 게시글에 좋아요 추가
+ 전송 데이터: params로 `PostId` 전송
+ 응답 데이터
```javascript
{
  message,
  likedPostId,
  UserId,
}
```
+ 응답 코드
  1. `200`: 좋아요 추가 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근
  4. `404`: 존재하지 않은 게시글에 좋아요 추가 요청
  5. `409`: 이미 좋아요 누른 상태에서 추가 요청

## 8.2 DELETE /like/post/:PostId
+ 역할: 게시글에 좋아요 삭제
+ 전송 데이터: params로 `PostId` 전송
+ 응답 데이터
```
{
  message,
  unlikedPostId,
  UserId,
}
```
+ 응답 코드
  1. `200`: 좋아요 삭제 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근
  4. `404`: 존재하지 않은 게시글에 좋아요 삭제 요청
  5. `409`: 좋아요를 누르지 않은 상태에서 삭제 요청

## 8.3 POST /like/comment/:CommentId
+ 역할: 댓글/답글에 좋아요 추가
+ 전송 데이터: params로 `CommentId` 전송
+ 응답 데이터
```javascript
{
  message,
  PostId,
  CommentId,
  // 해당 댓글이 답글인지 댓글인지 판단하기 위함
  RecommentId
  // 댓글에 좋아요 누른 유저 데이터
  commentLikerWithData: {
    _id,
    name,
    // 댓글에 좋아요 누른 유저의 프로필 이미지
    Images: [{ _id, name, url }]
    // 댓글의 좋아요에 대한 정보
    CommentLikes: {
      CommentId,
      UserId,
      createdAt,
      updatedAt,
    },
  },
}
```
+ 응답 코드
  1. `200`: 좋아요 추가 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근
  4. `404`: 존재하지 않은 댓글에 좋아요 추가 요청
  5. `409`: 이미 좋아요 누른 상태에서 추가 요청

## 8.4 DELETE /like/comment/:CommentId
+ 역할: 댓글/답글에 좋아요 삭제
+ 전송 데이터: params로 `CommentId` 전송
+ 응답 데이터
```javascript
{
  message,
  PostId,
  CommentId,
  RecommentId,
  UserId,
}
```
+ 응답 코드
  1. `200`: 좋아요 삭제 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근
  4. `404`: 존재하지 않은 댓글에 좋아요 삭제 요청
  5. `409`: 좋아요를 누르지 않은 상태에서 삭제 요청

# 9. bookmark
## 9.1 POST /bookmark/:PostId
+ 역할: 나의 북마크 추가
+ 전송 데이터: params로 `PostId` 전송
+ 응답 데이터
```javascript
{
  message,
}
```
+ 응답 코드
  1. `201`: 북마크 추가 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근
  4. `404`: 존재하지 않은 게시글에 북마크 추가 요청
  5. `409`: 이미 북마크인 게시글에 북마크 추가 요청

## 9.2 DELETE /bookmark/:PostId
+ 역할: 나의 북마크 제거
+ 전송 데이터: params로 `PostId` 전송
+ 응답 데이터
```javascript
{
  message,
}
```
+ 응답 코드
  1. `200`: 북마크 제거 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근
  4. `404`: 존재하지 않은 게시글에 북마크 제거 요청
  5. `409`: 북마크가 아닌 게시글에 북마크 제거 요청

## 9.3 GET /bookmark?lastId=❓limit=❓
+ 역할: 나의 북마크 게시글 가져오기
+ 전송 데이터: query로 `lastId`, `limit` 전송
+ 응답 데이터
```javascript
{
  message,
  posts: {
    _id,
    content,
    createdAt,
    // 게시글의 작성자
    User: {
      _id,
      name,
      // 게시글 작성자의 프로필 이미지
      Images: [{ _id, name, url }]
    },
    // 게시글의 댓글들 ( 개수를 위해서 )
    Comments: [{ _id }],
    // 게시글의 좋아요 ( 개수를 위해서 )
    PostLikers: [
      {
        _id,
        PostLikes: { createdAt },
      },
    ],
  },
  limit,
}
```
+ 응답 코드
  1. `200`: 북마크 게시글들 가져오기 성공
  2. `500`: 서버측 에러 ( 원인불명 )
  3. `401`: 비로그인 접근