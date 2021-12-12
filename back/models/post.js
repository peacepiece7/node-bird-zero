module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    // ref 1
    'Post',
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    // RetweetId
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', // ref 2
    }
  );
  Post.associate = (db) => {
    // ref 3
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
    db.Post.belongsTo(db.Post, { as: 'Retweet' });
  };
  return Post;
};

// 1. mysql에는 Posts 폴더 생성

// 2. 한영, 이모티콘 저장

// 3. 관계 메서드
// table생성 시 sequelize에서 자동으로 붙여주는 메서드
// 단수, 복수에 주의
// db.Post.belongsTo(db.User); => getUser, setUser, addUser, removeUser
// db.Post.hasMany(db.Comment); => getComments, setComments, addComments, removeComments
// db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }); => getLikers, setLikers, addLikers, removeLikers
