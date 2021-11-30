// sequelize 에서 model, mysql에서는 table

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    // mysql에는 users 폴더 생성
    "User",
    {
      email: {
        type: DataTypes.STRING(30), // STRING, TEXT, INTEGER, FLOAT, BOOLEAN, DATETIME
        allowNull: false,
        unique: true,
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      password: {
        // 암호화 자리수 늘어남
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", // 한영 저장
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    // db.Post가 두개니까 Liked로 별칭
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
    db.User.belongsToMany(db.User, { through: "Follow", as: "Followers", foreignKey: "FollowingId" });
    db.User.belongsToMany(db.User, { through: "Follow", as: "Followings", foreignKey: "FollowerId" });
  };
  return User;
};

// 1:1
// db.User.hasOne : db.UserInfo.hasOne
// n:m
// db.hashag.belongsToMany : db.Post.belongsToMany
// 1:m
// db.Post.hasMany : db.Comment.belongsTo

// through = table의 이름을 변경
// foreignKey = through table의 id를 변경 (UserId : UserId 이런식으로 같은 테이블에서 생긴 두 개의 아이디는 구분이 힘들기 떄문에)
