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
import Link from 'next/link'
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
  const buttonStyle = useMemo(() => ({ marginLeft: 10 }), [])
}
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
styled.div``
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

state의 immutablity가 지켜지지 않으면 redex devtool은 history를 남길 수 없음

이를 지키키위해 아래와 같이 항상 같은 reference를 가르키도록 작성할 것

```js
return {
  ...state,
  user: {
    ...state.user,
    isLoggedIn: true,
  },
}
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

action을 async로 사용가능

비동기에서는 아래 세 가지 요청을 기본으로 작성
Request, Success, Failure

Self DDOS를 막기위해 lodash or saga의 Throttle, debounce
