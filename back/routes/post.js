const express = require("express");

const postRouter = express.Router();

postRouter.get("/", (req, res) => {
  res.send("Hello, world!");
});

postRouter.get("/api", (req, res) => {
  res.send("Hello, api");
});

postRouter.get("/api/posts", (req, res) => {
  res.json([
    {
      id: 1,
      conetnet: "foo",
    },
    {
      id: 2,
      conetnet: "bar",
    },
    {
      id: 3,
      conetnet: "boo",
    },
    {
      id: 4,
      conetnet: "tae",
    },
  ]);
});

module.exports = postRouter;
