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
import Link from 'next/link';
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

코드 문서 참고

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
    type: 'LOG_IN',
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
  name: 'foo',
  age: '27',
  location: 'Busan',
  isLoggedIn: false,
};

// Action function, type를 추가해 주는 역할을 함
const loginAction = (data) => {
  return {
    type: 'LOG_IN',
    data,
  };
};
const logoutAction = (data) => {
  return {
    type: 'LOG_OUT',
    data,
  };
};

// Reducer, 실질적으로 state를 변경하는 코드
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        isLoggedIn: true,
      };
    case 'LOG_OUT':
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
dispatch(loginAction([{ name: 'bar' }, { age: '29' }]));
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
      .post('/api/login')
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
import { take, takeEvery } from 'redux-saga';

export function* watchAddPost() {
  // 일회용 함수로 한 번 포스팅히면 함수가 사라짐
  yield take('ADD_POST_REQUEST', addPost);

  // 이를 해결하기 위해 여러 방법이 있음
  while (true) {
    yield take('ADD_POST_REQUEST', addPost);
  }

  yield takeEvery('ADD_POST_REQUEST', addPost);
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

# immer적용하기

Curried produce [immer docs about Curried produce](https://immerjs.github.io/immer/curried-produce/) 참고하거나

코드를 참고해서 produce로 reducer를 변경

# back-end

- nodejs : js runtime engin

- 실제 통신은 http 모듈을 사용

- babel을 사용하지 않는 컨밴션이 있음

- express, nodemon, eslint등 기본 적인 설치 진행

# back-end server router 생성

'api/user', 'api/post' 등 api라우터 생성

# CORS (Cross Origin Resource Sharing)

![cors](test/cors%20error.png)

위 사진처럼 직접 작성하거나 cors 관련 패키지를 사용 할 수 있음

`npm i cors`

```js
// app.js
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
```

# passport

```
npm i passport passport-local
```

passport는 각종 소셜 로그인 stretegy을 가지고 이를 제공함
passport-local은 id, password || email, password로 로그인 하도록 도와주는 역할을 함

# build

빌드 후 각 페이지가 1mb를 넘지 않으면 한국에서 무리없이 서비스 할 수 있음

만약 1mb가 넘는다면 code spliting을 적용해서 react.lazy react suspense기능으로 용량을 잘게 나눠야한다.

# 404 customizing

pages/404.js (next docs참고)

```js
export default function Custom404() {
  return <div>not found the page..</div>;
}
```

# error message

pages/\_error.js

```js
잠시후에 시도해주세요, 고객샌터에 문의해주세요
```

## 배포하기

- aws로그인 -> ec2 생성하기(front, back 두 개의 서버를 생성할 거임) -> 프로티어 버전 우분투 ver18 lts선택 -> 보안그룹 http :80, https:443추가, ssh는 집 ip로 변경(배포할 때)
- 키패어 생성 -> 새로 만들어서 저장(.pem) => 프로잭트에 넣어둠(.gitignore추가)

# 배포하기

- 윈도우랑 합치세영

# error

WARNING: UNPROTECTED PRIVATE KEY FILE!

ssh연결하던 중 위와 같은 애러가 뜬다면

chmod 0400 ./react-nodebird-aws.pem으로 소유자의 읽기 권한만 부여

ssh로 ubunto ec2실행

# ssh로 ubunto접속

```
pwd 로경로확인

git clone https://www.github.com/peacepiece7/node-bird-zero

cd node-birod-zero
```

# node 설치하기 (14버전이 아니면 pm2실행이 안됨, script에 추가하지 않고 쓴다면 LTS를 받으면 됨)

```ssh
ubuntu/react-nodebird-zero

sudo apt-get update
sudo apt-get install -y build-essential
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash --
sudo apt-get install -y nodejs
```

- build-essential : bicypt(hasing)나 sharp(image resizing)설치할 떄 에러가 안나게 해줌

# front, back (node는 16을 깔았습니다)

- front ec2의 ssh/node-bird-zero/front에서 `npm i`

next가 `found 1 high severity vulnerability`(심각한 취약점을 1개 발견)해서 npm audit fix 실행 그리고 node 16.x로 변경함

- back ec2의 ssh/node-bird-zero/back에서 `npm i`

## 원래는 front, back, db서버를 따로 둬야하지만 비용이 발생하고 복잡해지니까 back에 db를 설치함

# ec2 ipv4

# ci-cd

node-bird-zero를 배포했는데 소스를 수정해서 다시 올리고 싶다면?

ec2 front, back server에 다시 들어가서 git clone, npm i, npm build를 해줘야함, 만약 db도 있고 서버거 여러개거나, 서버 스케일링으로 재설치 해야한다면

반복작업이 너무 많기 떄문에 귀찮음 이럴 때 ci-cd(continuous integration, continuous development)툴을 사용함

jenkins, cercleci, travis, docker 중 docker가 유명함 docker에 반복 작성 해야 할 명령어 적어두고 실행 -> 기존 서버랑 같은 서버를 생성해줌

# front build error

getStaticProps를 썻는데 db가 연결되어 있지 않다면 에러가 남

db연결 후 build or 임시로 getServerSideProps 변경 후 진행

# 질문 : front back 서버를 따로 배포하는 이유?

front, back instance를 따로 만드는 이유는 설정하기 간단하고 보통 하나의 서버에 하나의 인스턴스를 둔다고함

만약 하나의 서버에 두 개의 instance를 만들려면 추가로 nginx같은 서버가 필요하다고 한다.

# 질문 : ec2 front instance에서만 build가 안되요

로컬에서 빌드한 뒤 ec2 front에서 가져와도 됨 아래와 같이 할 수 있음

local에서 build후 .next를 git push origin master (.gitignore에서 뻄)

ec2 front에서 git pull origin master

# ec2 back-end server에 mysql 설치하기

`sudo apt-get install -y mysql-server`

`wget -c https://repo.mysql.com/mysql-apt-config_0.8.13-1_all.deb`

`sudo dpkg -i mysql-apt-config_0.8.13-1_all.deb`

`sudo apt-get update`

strong password입력

`sudo apt-get install mysql-server`

`sudo su`

`mysql_secure_installation`

전부 y해주고 비밀번호는 그냥 low로하자..

# ec2 back-end start

mysql설치가 끝났다면 back-end에 scripts를 아래와 같이 추가

`"start" : "node app"`

ec2 back에서 다시 git pull origin master 한 뒤

npm run start

# ec2 back-end .env 추가하기

.env는 git에 올라가 있지 않기 떄문에 따로 작성해야함

안 적으면 sequlize가 작동못함..

`vim .env`

a 누르고 작성

`:wq`로 저장

`ls -a`

`cat .env`로 저장된 거 확인

# access denited error

비밀번호 다시 변경

`sudo su`

`mysql -uroot -p`

`ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your password';`

`npx sequelize db:craete`

# change password policy (정책 변경할 떄)

`mysql -uroot -p`

`SHOW VARIABLES LIKE 'validate_password%';`

`SET GLOBAL validate_password_policy=LOW;`

`select password('xodnr7282!');`

# 왜 access denined?

mysql 설치할 떄 ubuntu로 하고 mysql_secure_installation은 root에서 해서 비밀번호가 서로 같다고 인식을 못함

mysql에서 user검색 시 plugin이 unix_soket이면 비밀번호가 무용지물,

mysql_native_password로 plugin을 변경해주는 작업이 필요

# Error : listen EACCES : permission denied 0.0.0:80

[stack-over-flow](https://stackoverflow.com/questions/60372618/nodejs-listen-eacces-permission-denied-0-0-0-080)답변

`we do NOT want to run your applications as the root user`

웹 사이트를 rootuser로 실행하는 것을 우리는 대부분 원하지 않음,

1024번 이전 포트는 모두 안전한 사용자아게만 제공되는 것을 기본으로 함

아래 코드로 1024이전 포트를 허용할 수 있음

```
> sudo apt-get install libcap2-bin
> sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\``
```

or

아래처럼 8080port로 접속 시 80번 포트로 redirection되도록 변경할 수 있음

[꾸앵 블로그](https://juni-official.tistory.com/144)

```
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
```

# pm2사용하기

### foreground process

- 터미널을 끄면 서버가 같이 꺼짐(nodejs)

### background process

- 터미널을 꺼도 서버가 안 꺼짐(pm2)

### shell 권한에 대해서

- buntu@ip-17... : 1023이전 포트에대한 권한이 없음(관리자 권환x)

- root@ip-17.. : sudo su로 접속, root는 1023이전 포트에대한 권한이 있음(sudo ...도 가능)

## background로 node app 실행하기

- $ ... 로 node app을 실행할 수 있음(권장하지 않음)

`npm i pm2`

```
vim package.json

"start" : "pm2 start app.js"로 변경
```

`sudo npm start`

error발생시 pm2 start app.js로 직접 실행

[pm2](https://www.npmjs.com/package/pm2)

```
pm2 monit
pm2 list
pm2 restart
pm2 stop app.js
pm2 delete app.js
pm2 kill
```

# 아이피 고정

'탄력적 아이피 고정'전까지 public IPv4주소는 계속 변경됨(고정시 돈이 나감)

# 보안 설정

```js
// back/app.js

if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
  app.use(hpp());
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}
```

스크릅트 변경

```json
{
  "start": "cross-env NODE_ENV-production pm2 start app.js"
}
```

<br>

# 이제 front를 배포합시다 🙃🙃

`npm i pm2`

# backend랑 연동 에러 미리잡기
