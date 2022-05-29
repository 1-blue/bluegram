const Room = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    "Room",
    {
      _id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: "채팅방의 아이디 ( 채팅방을 식별할 값 )",
      },
      name: {
        type: DataTypes.STRING(50),
        alllowNull: true,
        comment: "게시글의 내용 ( 최대 50자, 특수문자 가능 )",
      },
    },
    {
      sequelize,
      timestamps: true,
      paranoid: false,
      underscored: false,
      modelName: "Room",
      tableName: "rooms",
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    },
  );

  Room.associate = db => {
    // 유저와 채팅방 ( N : M )
    db.Room.belongsToMany(db.User, {
      through: "RoomUsers",
      as: "RoomUser",
      foreignKey: "RoomId",
      onDelete: "cascade",
    });

    // 채팅방과 채팅 ( 1 : N )
    db.Room.hasMany(db.Chat, { onDelete: "cascade" });
  };

  return Room;
};

export default Room;
