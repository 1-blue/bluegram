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
      src: {
        type: DataTypes.STRING(40),
        allowNull: false,
        comment: "이미지 이름 ( 최대 40자리 )",
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
    db.Image.belongsTo(db.User, { foreignKey: "UserId" });

    // 게시글와 이미지 ( 1 : N )
    db.Image.belongsTo(db.Post, { foreignKey: "PostId" });
  };

  return Image;
};

export default Image;