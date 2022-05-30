const Chat = (sequelize, DataTypes) => {
  const Chat = sequelize.define(
    "Chat",
    {
      _id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: "채팅의 아이디 ( 채팅을 식별할 값 )",
      },
      contents: {
        type: DataTypes.STRING(200),
        allowNull: false,
        comment: "채팅 내용 ( 200자 이내 )",
      },
    },
    {
      sequelize,
      timestamps: true,
      paranoid: false,
      underscored: false,
      modelName: "Chat",
      tableName: "chats",
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    },
  );

  Chat.associate = db => {
    // 채팅방과 채팅 ( 1 : N )
    db.Chat.belongsTo(db.Room, { foreignKey: "RoomId", onDelete: "cascade" });

    // 유저와 채팅 ( 1 : N )
    db.Chat.belongsTo(db.User, { foreignKey: "UserId", onDelete: "cascade" });
  };

  return Chat;
};

export default Chat;
