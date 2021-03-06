# CSR, Client Side Rendering

### 클라이언트가 해당 사이트에 방문 시

1. 아래 순서로 data + js,html,css 파일을 받아 옴

- 브라우저 -> 프론트 서버 -> 백엔드 서버 -> 데이터 베이스
- 데이터베이스 -> 백엔드 서버 -> 프론트 서버(js,html,css모든 파일을 전송) -> 브라우저

# SSR, Server Side Rendering

### 클라이언트가 해당 사이트에 방문 시

1. 일단 빈 화면을 먼저 브라우저에 전송함

- 브라우저 -> 프론트 서버 -> 브라우저 (loading spnner or 메인 화면, 데이터가 없는 화면)

2. 요청이 있을 경우 아래 순서로 진행 (골격은 변경하지 않음)

- 브라우저 -> 백엔드 -> 데이터 베이스 -> 백엔드 -> 브라우저

# 용어

### 전통적 사이트의 경우 (CSR)

- 클라이언트가 해당 사이트에 방문 시 해당 라우터의 데이터(js,html,css파일 + db에서 가저와야하는 데이터)를 모두 가져옴
- 처음으로 화면이 뜨는 시간은 느리지만, 전체적인 시간은 SSR보다 빠름

어떤 경우 CSR이 유리할까?

- 전체적인 속도가 SSR보다 빠르기 떄문에 첫 로딩시간이 3초 이내라면 오히려 CSR이 빠를 수도 있음
- 모든 데이터를 가지고 있기 떄문에, SEO에 유리

### React, vue에서는 (SPA, Single Page Application)

- 첫 로딩시 html,css,js 파일만 가저옴,
- 중요 데이터는 loading sinpper로 나타내고, 프래임을 먼저 보여줌으로
- 사용자의 interation을 향상시킬 수 있음
- 첫 로딩시 데이터가 없으르모 SEO에 불리함

어떤 경우 react vue (SPA)를 사용해야 할까

- 사용자와의 interation이 중요한 경우 유리

### SSR (Server Side Rendering)

- B2B, B2C의 경우 react, vue로 만들었다면 SSR, code spliting을 적용해야 함
- SSR은 첫 방문시 SEO 순위를 올리기위해 필요한 페이지의 데이터만 가져오고 a tag나 link 클릭시 SPA방식으로 빠르게 랜더링 하도록 해주고
- code spliting은 admin, profile같은 클라이언트가 당장에 필요하지 않는 라우터의 데이터를 받아오지 않도록 함

# re-rendering

- 함수가 호출될 때, 관계가 없는 컴포넌트가 변경되었다고 react dev tool이 표시를 하더라도 성능상 크게 문제가 되진 않음
- 왜냐면 컴포넌트의 return을 모두 다시 그리는게 아니라 변경된 부분이 없다면 다시 호출을 하기 때문
- 해당 컴포넌트의 로직이 복잡하지 않다면, memo, useMemo, useCallback을 사용하는게 메모리 낭비가 더 클 수도 있음

# j-query + react

- j-query -> 직접 화면을 다시 그러야 함 btn Click -> doc.query("button").text("hello")
- react, vue -> 데이터만 변경해줌 text = hello 이래서 같이 쓰면 react의 이점이 없음

# 대륙의 실수

- vue, e-chart, antd

# redux-thunk
