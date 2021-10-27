# Get start

`npm i next`
`npm i react react-dom`

front/pages에 page.js 생성 (폴더 이름 변경 불가)

front/component에 component (폴더 이름 변경 가능)

# Tips

### props.chilren으로 하휘 요소 랜더링하는 방법

### next는 react hot loader(nodemon같은 거)가 적용되어 있음

### component에 props를 넘겨주는 함수는 useCallback을 사용할 것

### <a target="_black" rel="noreferer noopener"/><a> noreferer noopener 옵션으로 참고 주소, 방문자 기록을 삭제해야 함

### useCallback = 함수를 저장(props를 인자로 넘겨주는 함수는 useCallback을 반드시 작성해주자), useMemo = 값을 저장

## Link (Next Router)

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

# Custom hook

hooks/useInput.js를 참고

state을 저장할 때, 변수 명만 다르고 로직이 같다면 custom hook을 만들 수 있음.

# redux

```
npm install next-redux-wrapper@6
npm install react-redux
```
