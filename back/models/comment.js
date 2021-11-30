module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    // id 자동 생성
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", // 한영, 이모티콘 저장
    }
    // belongsTo의 역할
    // UserId : ..
    // PostId : ..
    // 의 컬럼이 생김
  );
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};
