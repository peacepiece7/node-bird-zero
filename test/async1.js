const clientInfo = { id: "foo", password: "bar" };

const getLogin = (user) => {
  // db에 저장되어 있는 userData
  const userData = [
    {
      id: "foo",
      password: "bar",
      data: {
        name: "taetae",
      },
    },
    {
      id: "pee",
      password: "bot",
      data: {
        name: "excel bot",
      },
    },
    {
      id: "poo",
      password: "bear",
      data: {
        name: "sizinping",
      },
    },
  ];

  const matched = userData.find((v) => {
    if (v.id === user.id && v.password === user.password) {
      return v;
    }
  });

  return new Promise((res, rej) => {
    setTimeout(() => {
      res(matched);
    }, 2000);
  });
};

getName = (user) => {
  console.log(user.data.name);
};

getLogin(clientInfo).then((res) => {
  console.log(res.data);
});
