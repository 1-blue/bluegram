const Image = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
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
      modelName: "Image",
      tableName: "images",
      charset: "utf8",
      collate: "utf8_general_ci",
    },
  );

  Image.associate = db => {
    // 유저와 이미지 ( 1 : N )
    db.Image.belongsTo(db.User, { foreignKey: "UserId", onDelete: "cascade" });

    // 게시글와 이미지 ( 1 : N )
    db.Image.belongsTo(db.Post, { foreignKey: "PostId", onDelete: "cascade" });
  };

  return Image;
};

export default Image;
