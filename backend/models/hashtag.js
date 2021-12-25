const Hashtag = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    "Hashtag",
    {
      _id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: "해시태그의 아이디 ( 해시태그을 식별할 값 )",
      },
      content: {
        type: DataTypes.STRING(40),
        alllowNull: true,
        comment: "해시태그의 내용 ( 최대 40자, 특수문자 불가능 )",
      },
    },
    {
      sequelize,
      timestamps: true,
      paranoid: false,
      underscored: false,
      modelName: "Hashtag",
      tableName: "hashtags",
      charset: "utf8",
      collate: "utf8_general_ci",
    },
  );

  Hashtag.associate = db => {
    // 해시태그 ( N : M ) ( 게시글과 해시태그 )
    db.Hashtag.belongsToMany(db.Post, {
      through: "postHashtags",
      as: "postHashtaged",
      foreignKey: "HashtagId",
      onDelete: "cascade",
    });
  };

  return Hashtag;
};

export default Hashtag;
