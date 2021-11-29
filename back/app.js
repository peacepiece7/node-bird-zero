const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/api", (req, res) => {
  res.send("Hello, api");
});

app.get("/api/posts", (req, res) => {
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

app.listen(3065, () => {
  console.log("Listen : 3065 port");
});
