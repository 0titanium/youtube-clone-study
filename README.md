### youtube-clone-study

#### youtube-clone-study with https://github.com/jaewonhimnae/react-youtube-clone


***

1. github repository 만들기


2. echo readme, git init, add, remote, ...


3. server folder - npm init, package install, index, config, model, routes, middlware


4. client folder - create-react-app, package install , index, app, setupproxy, navbar, landing, register, login, footer, store, actions, reducers, hoc

-navbar css 수정이 오래 걸렸다. div에 width와 margin-top을 주는 것만으로 해결되었지만 logout버튼이 좀 못생긴 간격을 가지게 된 것 같다.

2021-08-03


***

upload 버튼을 만드니 logout만 있던 것보단 간격이 예뻐진듯 하다.


upload form은 다 만들었고 multer library를 사용해서 저장하게 했다.


thumbnail이랑 동영상이 다올라가게 했다. 어쩐지 git push가 느렸다.


나중에 git ingore에 넣어도 적용이 안되는 것으로 알고 있는데 혹시?


-> 역시 안됐다. git rm


thumbnail 이미지가 제대로 표시되지않는 에러가 있다. 경로 문제인 것 같다.


2021-08-04


***



thumbnail 이미지 에러를 해결했다.


-> 해결법은 server/index.js에 "app.use("/uploads", express.static("uploads"));"를


적어주는 것이었다. 서버의 static file들을 클라이언트에서 사용하기 위해서 필요한 것이다.


자세한 내용은 https://expressjs.com/en/starter/static-files.html


- props.hitory.push를 쓸 때는 withRouter를 써야한다고 했는데 안써도 잘 페이지를 이동한다?


될 때와 안될 때의 차이점이 무엇인지?


-> withRotuer는 Router(BrowserRotuer등) 하위 컴포넌트에 있지 않은데 route 기능을 써야할 때


사용한다고 한다.


vscode tab 이동 단축키는 'ctrl+tab'이다. 여태 불편하게 클릭하면서 살았다.


ladingPage에서 저장된 비디오를 불러오고 detail page 작업중



2021-08-05



***

landingPage에서 비디오 썸네일을 클릭하면 해당 비디오를 보여주는 videoDetailPage로 이동,


videoDetailPage에서 영상과 다른 영상들을 보여주는 SideVideos까지 작성완료.


남은 기능 -> 구독, 댓글, 좋아요/싫어요





강의에 없지만 추가하고 싶은 것들


-> Logout을 <div onClick={dropdown}>avatar name</div> 형태로

-> 마이페이지 (내가 업로드한 영상들 보여주기, 삭제 기능)

-> 생각나는 것은 이 정도? 강의를 완료하고 할까? 남은 것 하기전에 할까?



/*
강의 외 추가 기능 작성 순서? 강의 완료하고 하는게 나을듯.
1. navBar에 logout버튼을 아바타+네임으로 바꾸기
2. 아바타+네임을 클릭하면 드롭다운으로 myPage, Logout 보여주기
3. logout은 logout
4. myPage 컴포넌트 스타일링
5. myPage "내가 업로드한 영상"+"좋아요/싫어요 수"+"댓글 수"+"삭제 버튼"
6. myPage 데이터 페치.
7. myPage API 작성
*/




따라하다 보니 몰랐는데 url들이 전혀 restful 해보이지 않는다. 동사를 포함하지 않으면

url 작명이 어려운 것 같다. 자원만 써서 하면 데이터 요청을 할 때 메서드가 중복될 것 같은데? 어떻게 구분하는겨.




subscriber에서 구독자 수를 보낼 때는 에러가 없는데 구독정보를 보낼 때에는 모델이 정의 되어있지 않다고 한다?
rs하니 괜찮아졌다.

구독기능 추가중...

2021-08-06