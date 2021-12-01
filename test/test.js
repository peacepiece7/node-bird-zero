//! require("file.json")을 변수에 할당할 경우 객체로 해석된다.

const path = require("path");
const basename = path.basename(__filename);

const config = require("./back/config/config.json");

console.log(__filename);
console.log(basename);
console.log(process.env.NODE_ENV || "development");

console.log(config["development"]);
