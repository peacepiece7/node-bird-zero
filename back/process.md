# front, back의 역할

- term

Front-end : SSR

Back-end : API 제공

scaling : 확장(서버 확장)

- 각 기능별로 서버를 만드는 경우 scaling에 유리.

- 예를들어

배민 점심 피크 요청이 폭주하여 주문 api의 scaling이 필요할 경우,

front, backend가 하나의 서버에 등록되어 있다면 scaling시 둘 다 복사해야함

하지만 front-end, back-end 서버가 따로 있을 경우 back-end만 복사하면 됨

# express, rest api

app.get => 가져오기

app.post => 생성하기

app.delete => 삭제하기

app.put => 전체 수정 (전체 덮어쓰기)

app.options => 찔러보기

app.patch => 부분 수정 (게시글 수정, 닉네임 수정)

app.header => 헤더만 가져오기 (헤더/바디)

- rest api method는 합의
- postman으로 get, post, delete 등 사용해서 확인
- 애매하면 post임 ( 게시글 가져오면서 조회수 1 올린다)

### swagger api doc작성할 떄 사용
