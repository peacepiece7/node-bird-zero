# Get start

`npm i next`
`npm i react react-dom`

front/pages에 page.js 생성 (폴더 이름 변경 불가)

front/component에 component (폴더 이름 변경 가능)

`npx i create-next-app 도 가능`

# Tips

### props.chilren으로 하휘 요소 랜더링하는 방법

### next는 react hot loader(nodemon같은 거)가 적용되어 있음

### component에 props를 넘겨주는 함수는 useCallback을 사용할 것

### <a target="_black" rel="noreferer noopener"/><a> noreferer noopener 옵션으로 참고 주소, 방문자 기록을 삭제해야 함

### useCallback = 함수를 저장(props를 인자로 넘겨주는 함수는 useCallback을 반드시 작성해주자), useMemo = 값을 저장

### Link (Next Router)

### \_app.js , \_document,js의 차이 https://merrily-code.tistory.com/154 (\_app.js = reactDom.render(), \_docuemnt,js = common <head>)

```js
import Link from "next/link";
```

# Eslint setting

```
npm install eslint -D
npm install eslint-plugin-import -D
npm install eslint-plugin-react -D
npm install eslint-plugin-react-hooks -D
```

.eslintrc file 참고

# antd

`npm install antd`
`npm install @ant-design/icons`

# Design 구성

디자인을 할 때 먼저 화면을 가로로 자르고 각 row를 세로로 잘라서 디자인한다.

**mobile -> tablet -> desktop 순서로 디자인**

ant design에서 제공해주는 colum, row로 화면을 분할하거나, offset으로 빈 공간을 줄 수 있음

[Offset Design](https://ant.design/components/grid/https://ant.design/components/grid/)

# styled-component

1. useMemo로 styling

```js
const LoginForm = () => {
  const buttonStyle = useMemo(() => ({ marginLeft: 10 }), []);
};
```

추가) useMemo = 값을 캐싱, useCallback = 함수를 캐싱

2. styles로 컴포넌트에 직접 추가

```js
<SearchButton style={{ marginLeft: 10 }} />
```

3. styles-component 사용

> 아직 suppressHydrationWarning이슈를 해결하지 못함

```js
import styled = require("styled-component")
const ButtonWrapper = styled.div`
    margin-top : 10px
`

<ButtonWrapper>
    <Button htmlType="submit" />
</ButtonWrapper>
```

# tagged templete literal

``는 ()랑 같음 내부 구현이 조금 다르다고 함 (div가 method)

```js
styled.div``;
```

# Custom hook

hooks/useInput.js를 참고

state을 저장할 때, 변수 명만 다르고 로직이 같다면 custom hook을 만들 수 있음.

# redux

아래 세 가지 라이브러리를 다운

```
npm install next-redux-wrapper@6
npm install react-redux
npm install redux
```

store/configureStore.js에 state store를 만듬 (파일 참고)

이제, next-redux-wrapper에 의해 state가 변경될 경우 이 곳에 저장됨

총 3단계를 거침,

1. reducer에 초기 state를 입력 (BE or db에서 가져오거나 dummyData를 사용)
2. component에서 state 변경 요청을 보냄 (useDispatch), 초기 state를 요청 콜백으로 받아 옴(useSelector)
3. next-reduce-wrapper가 요청을 처리 초기 state를 변경

reducer 작성 요령

```js
// reducer/index.js
import { HTDRATE } from "next-redux-wrapper"

const initialState = {
  user : {
    ...
  }
}

export const loginAction = (data) => {
  return {
    type: 'LOGIN',
    data,
  }
}

// .. 계속해서 action을 작성


const reducer = (state = initialState, action) => {
  switch (state.type){
      case HYDRATE:
      console.log(HYDRATE)
      return { ...state, ...action.payload }
    case 'LOGIN':
      return {...state, state.user.isLoggedIn :true}
  } // .. 계속해서 action에 따른 로직을 작성
  default
    return state
}
```

위의 코드 진행 순서

1. component에서 dispatch(loginAction(state)) 수정된 state를 loginAction으로 보냄
2. 해당 type 이 'LOGIN'이고, reducer의 두번쨰 인자로 loginAction의 return값이 보내짐
3. re-rendering되고 state가 적용 됨

# tracking을 위한 redux middleware-dev-tools

`npm install redux-devtools-extention`

store/configureStore.js에 enhancer를 추가 (코드는 configuerStae.js를 참고)

```js
// redux saga를 위한 middware
const middlewares = []
const enhancer = procees.env.NODE_ENV === "production:
? compose(applyMiddleware(...middlewares))
: composeWithDevTolls(applyMiddleware(...middlewares))

// 두 번째 인자로 enhancer를 할당
const store = craeteStore(reducer, enhancer)
```

redux devtools extention을 다운 받고 state변경 기록을 확인

### Immutablity (불변성)

### loginAction

action은 type을 붙이기 위해서 사용, 데이터를 인자로 받지 않을 경우 객체로 표현할 수 있다 (addpost참고)

```js
export const loginAction = (data) => {
  return {
    type: "LOG_IN",
    data,
  };
};
const dispatch = Dispatch();
dispatch(loginAction([id, password]));
```

state의 immutablity가 지켜지지 않으면 redex devtool은 history를 남길 수 없음

이를 지키키위해 아래와 같이 항상 같은 reference를 가르키도록 작성할 것

```js
return {
  ...state,
  user: {
    ...state.user,
    isLoggedIn: true,
  },
};
```

# 간단하게 작성해본 redux 내부 기능 구조 (실제와 다름)

```js
// init state
// 실제로는 combinReducers method로 구조화 시킴
const initiationState = {
  id: 1,
  name: "foo",
  age: "27",
  location: "Busan",
  isLoggedIn: false,
};

// Action function, type를 추가해 주는 역할을 함
const loginAction = (data) => {
  return {
    type: "LOG_IN",
    data,
  };
};
const logoutAction = (data) => {
  return {
    type: "LOG_OUT",
    data,
  };
};

// Reducer, 실질적으로 state를 변경하는 코드
const reducer = (state, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "LOG_OUT":
      return {
        ...state,
        isLoggedIn: false,
      };
  }
};

// Store
const store = (state = initiationState) => {
  // 실제로는 모든 state를 저장할 수 있도록
  // 많은 기능을 지원함
  return state;
};

// COMPONENET METHODS ...
// 1. useSelector
const useSelector = (cbState) => {
  // initiation state
  const cur = store();
  return cbState(cur);
};
const b = useSelector((state) => state.isLoggedIn);
// <div>b</div>
console.log(b);

// 2. dispatch, Dispatch는 생성자 함수임, 간단하게 함수로 변경
const dispatch = (action) => {
  // action.type을 제외한 action 객체와 cur를 비교, 변경하는 코드
  const cur = store();
  const fetched = reducer(cur, action);
  console.log(fetched);
};
// const onSubmit(() => { dispatch(...)})
dispatch(loginAction([{ name: "bar" }, { age: "29" }]));
```

### antd Form

- postFrom, PostImages, CommentForm.js를 참고하여 comment form을 작성

### Image Caroucel ( 이미지 회전목마 )

react-slick을 이용해서 게시물의 이미지를 이동해서 볼 수 있도록 작성

`npm i react-slick`

### 컴포넌트 구조화

> > imageZoom 폴더를 참고

styled-componenet의 createGlobalStyle를 사용해서 스타일링

// https://developer0809.tistory.com/128

### redux-thunk

1. dispatch를 async로 사용할 수 있도록 지원해주는 middleware
2. 하나의 action에 여러개의 dispatch를 사용할 수 있음
3. 비동기는 보통 세 가지 요청을 기본으로 작성(Request, Success, Failure)

Self DDOS를 막기위해 lodash or saga의 Throttle, debounce

```js
export const loginAction = (data) => {
  return (dispatch, getState) => {
    // initialState (rootReducer)부분이 나옴
    const state = getState();

    // 한 번에 여러개의 dispatch
    dispatch(loginRequestAction());
    axios
      .post("/api/login")
      .then((res) => {
        dispatch(loginSuccessAction(res.data));
      })
      .catch((err) => {
        dispatch(loginFailureAction(res.data));
      });
  };
};
```

- redux가 없으면

1. client가 로그인 시 -> state.user.isLogged = true로 변경
2. 비동기 요청으로 user data, cookie를 얻음
   `axios.post("api/login", options).then((res) => ( setUserState(res.data) ))`

# redux-saga

### take, takeEvery, takeLatest, takeLeading, throttle

- take는 동기
- takeEvery는 비동기

- takeLatest는 throttle(마지막 요청만 실행, 응답을 취소, 요청을 두 번 받았는지 체크 필요, ddos)
- takeLeading은 처음 요청만 실행
- throttle로 요청 제한을 둘 수 있음

```js
import { take, takeEvery } from "redux-saga";

export function* watchAddPost() {
  // 일회용 함수로 한 번 포스팅히면 함수가 사라짐
  yield take("ADD_POST_REQUEST", addPost);

  // 이를 해결하기 위해 여러 방법이 있음
  while (true) {
    yield take("ADD_POST_REQUEST", addPost);
  }

  yield takeEvery("ADD_POST_REQUEST", addPost);
}
```

### Reducer Flow

1. Componenet에서 requestAction함수가 실행됨

2. requestAction함수의 action.type, action의 argument가 saga middleware, reducer로 전달됨

3-1. saga에서 비동기로 action을 처리

3-2. saga에서 action.type이 일치할 경우 yield하고 해당 결과(action.type === "SUCCESS")를 reducer로 보냄

4-1. 3-1이 실행될 때 동기적으로 request action을 처리 로딩창을 띄워줌

4-2. 3-2의 결과를 reducer가 받고 action.type === "SUCCESS"인 action을 수행함

### Reapaire eslint

eslint terminal에서 나오는 에러에 따라서 진행할 것 (예를 들어 eslint-plugin-jsx-a11y)

`npm i -D babel-eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-react-hooks eslint-plugin-jsx-a11y`

a11y = accessablity

https://velog.io/@\_jouz_ryul/ESLint-Prettier-Airbnb-Style-Guide%EB%A1%9C-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0

### eslint

settings -> defaultFomater, on save fomater 확인

## why airbnb styles perfer to function expression

https://stackoverflow.com/questions/37288950/why-does-the-airbnb-style-guide-say-that-relying-on-function-name-inference-is-d

### immer

immer , useimmer (instace of useState)

### react-virtualized

--> 이거 적용해서 다시 만들어 보기

Virtualized-List
