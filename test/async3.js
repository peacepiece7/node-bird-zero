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

async function poo() {
  try {
    // bucket에 값이 할당 되기 까지 그 아래 코드는 실행되지 않음
    const bucket = await (function () {
      return new Promise((res, rej) => {
        const dummyData = {
          items: {
            item1: 1,
            item2: 2,
            item3: 3,
          },
        };
        setTimeout(() => {
          res(dummyData);
        }, 1000);
      });
    })();

    const bucket2 = (function () {
      const dummyData = {
        sync1: 1,
        sync2: 2,
        sycn3: 3,
      };

      return dummyData;
    })();
    return [bucket, bucket2];
  } catch (e) {
    console.log(e);
  }
}

poo().then((res) => {
  console.log(res);
});

// 함수는 Promise의 res를 반환해야 함
// return new Promise((res,rej)) res를 callback함수로 사용, await, then을 사용 할 수 있게됨

// async await
// 1. 함수안에서 동작함
// 2. 복잡한 로직에 사용하면 콜백 지옥을 피할 수 있음

// then
// 1. 함수에 메서드처럼 붙여서 사용
// 2. 간단한 로직에 사용하면 깔끔함
