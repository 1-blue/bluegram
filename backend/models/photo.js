const Photo = (sequelize, DataTypes) => {
  const Photo = sequelize.define(
    "Photo",
    {
      _id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: "이미지의 아이디 ( 이미지를 식별할 값 )",
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: true,
        comment: "이미지 이름 ( 최대 150자리 )",
      },
      url: {
        type: DataTypes.STRING(150),
        allowNull: true,
        comment: "OAuth 인증일 경우 대체할 url",
      },
    },
    {
      sequelize,
      timestamps: true,
      paranoid: false,
      underscored: false,
      modelName: "Photo",
      tableName: "photos",
      charset: "utf8",
      collate: "utf8_general_ci",
    },
  );

  Photo.associate = db => {
    // 유저와 이미지 ( 1 : N )
    db.Photo.belongsTo(db.User, { foreignKey: "UserId", onDelete: "cascade" });

    // 게시글와 이미지 ( 1 : N )
    db.Photo.belongsTo(db.Post, { foreignKey: "PostId", onDelete: "cascade" });
  };

  return Photo;
};

export default Photo;
