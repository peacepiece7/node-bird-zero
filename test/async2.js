// db에 비동기로 데이터를 넣기

const pickUpItem = (item) => {
  // 아이템 하나를 픽업하는데 1초가 걸림
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(item.item);
      rej("no items!");
    }, 1000);
  });
};

const getBucketList = () => {
  // 실제로는 fetch해서 data를 가져 오는 로직이 필요함
  const dummyData = [
    {
      UUID: 1,
      item: {
        orderNumber: 11,
        name: "foo",
        price: 10000,
      },
    },
    {
      UUID: 2,
      item: {
        orderNumber: 22,
        name: "bar",
        price: 20000,
      },
    },
    {
      UUID: 3,
      item: {
        orderNumber: 33,
        name: "pee",
        price: 30000,
      },
    },
  ];
  // 바구니 아이템을 가져오는데 2초가 걸림

  return new Promise((res, rej) => {
    setTimeout(() => {
      res(dummyData);
      rej("데이터를 가저오지 못했습니다.");
    }, 2000);
  });
};

getBucketList().then((res) => {
  res.map((v, i) => {
    setTimeout(() => {
      pickUpItem(v).then((res) => {
        console.log(res.name);
      });
    }, i * 1000);
  });
});
