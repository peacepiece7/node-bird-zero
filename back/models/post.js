module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    // mysql에는 Posts 폴더 생성
    "Post",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    // RetweetId
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_cli", // 한영, 이모티콘 저장
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    // db.Post.hasMany(db.Comment);
    // db.Post.hasMany(db.Image);
    // db.Post.belongsToMany(db.Hastag);
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });
    // db.Post.belongsTo(db.Post, { as: "Retweet" });
  };
  return Post;
};
