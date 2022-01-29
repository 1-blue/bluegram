# DB 생성
CREATE DATABASE blegramDB DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

# 유저 생성 및 패스워드 지정 ( 패스워드는 혹시 모르니 명시안함 )
CREATE user blegramUser@'%' IDENTIFIED BY '비밀번호알아서작성';

# 유저 권한 부여
GRANT ALL PRIVILEGES ON blegramDB.* TO 'blegramUser'@'%';

# 유저 권한 부여한거 적용
flush privileges;

# 유저 삭제
drop user blegramUser@'%';

# DB 삭제
drop database blegram;

# 나머지 테이블 생성부분은 sequelize에 정의한대로 알아서 만들어줌