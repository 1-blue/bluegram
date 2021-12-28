const User = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      _id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: "유저의 아이디 ( 유저를 식별할 값 )",
      },
      id: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: true,
        comment: "유저가 로그인할 때 사용할 아이디",
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "유저가 로그인할 때 사용할 비밀번호 ( bcrypt 적용 )",
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: "유저 성명",
      },
      phone: {
        type: DataTypes.STRING(11),
        allowNull: true,
        comment: "유저 전화번호",
      },
      birthday: {
        type: DataTypes.STRING(8),
        allowNull: true,
        comment: "유저 생년월일",
      },
      snsId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "OAuth 로그인 시 해당 아이디",
      },
      provider: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: "OAuth 로그인 시 로그인의 주체",
      },
    },
    {
      sequelize,
      timestamps: true,
      paranoid: false,
      underscored: false,
      modelName: "User",
      tableName: "users",
      charset: "utf8",
      collate: "utf8_general_ci",
    },
  );

  User.associate = db => {
    // 팔로우 ( N : M )
    db.User.belongsToMany(db.User, {
      through: "Follows",
      as: "Followings",
      foreignKey: "FollowerId",
      onDelete: "cascade",
    });
    db.User.belongsToMany(db.User, {
      through: "Follows",
      as: "Followers",
      foreignKey: "FollowingId",
      onDelete: "cascade",
    });

    // 유저와 게시글 ( 1 : N )
    db.User.hasMany(db.Post, { onDelete: "cascade" });

    // 유저와 댓글 ( 1 : N )
    db.User.hasMany(db.Comment, { onDelete: "cascade" });

    // 게시글 좋아요 ( N : M ) ( 유저와 게시글 )
    db.User.belongsToMany(db.Post, {
      through: "PostLikes",
      as: "PostLiked",
      foreignKey: "UserId",
      onDelete: "cascade",
    });

    // 댓글 좋아요 ( N : M ) ( 유저와 댓글 )
    db.User.belongsToMany(db.Comment, {
      through: "CommentLikes",
      as: "CommentLiked",
      foreignKey: "UserId",
      onDelete: "cascade",
    });

    // 유저와 이미지 ( 1 : N )
    db.User.hasMany(db.Image, { onDelete: "cascade" });
  };

  return User;
};

export default User;
