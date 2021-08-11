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

- upload 버튼을 만드니 logout만 있던 것보단 간격이 예뻐진듯 하다.


upload form은 다 만들었고 multer library를 사용해서 저장하게 했다.


- thumbnail이랑 동영상이 다올라가게 했다. 어쩐지 git push가 느렸다.


- 나중에 git ingore에 넣어도 적용이 안되는 것으로 알고 있는데 혹시?


-> 역시 안됐다. git rm


- thumbnail 이미지가 제대로 표시되지않는 에러가 있다. 경로 문제인 것 같다.


2021-08-04


***



- thumbnail 이미지 에러를 해결했다.


-> 해결법은 server/index.js에 "app.use("/uploads", express.static("uploads"));"를


적어주는 것이었다. 서버의 static file들을 클라이언트에서 사용하기 위해서 필요한 것이다.


자세한 내용은 https://expressjs.com/en/starter/static-files.html


- props.hitory.push를 쓸 때는 withRouter를 써야한다고 했는데 안써도 잘 페이지를 이동한다?


될 때와 안될 때의 차이점이 무엇인지?


-> withRotuer는 Router(BrowserRotuer등) 하위 컴포넌트에 있지 않은데 route 기능을 써야할 때


사용한다고 한다.


- vscode tab 이동 단축키는 'ctrl+tab'이다. 여태 불편하게 클릭하면서 살았다.


- ladingPage에서 저장된 비디오를 불러오고 detail page 작업중



2021-08-05



***

- landingPage에서 비디오 썸네일을 클릭하면 해당 비디오를 보여주는 videoDetailPage로 이동,


- videoDetailPage에서 영상과 다른 영상들을 보여주는 SideVideos까지 작성완료.


- 남은 기능 -> 구독, 댓글, 좋아요/싫어요





- 강의에 없지만 추가하고 싶은 것들


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




- 따라하다 보니 몰랐는데 url들이 전혀 restful 해보이지 않는다. 동사를 포함하지 않으면


url 작명이 어려운 것 같다. 자원만 써서 하면 데이터 요청을 할 때 메서드가 중복될 것 같은데? 어떻게 구분하는겨.




- subscriber에서 구독자 수를 보낼 때는 에러가 없는데 구독정보를 보낼 때에는 모델이 정의 되어있지 않다고 한다?


->rs하니 괜찮아졌다.

구독기능 추가중...

2021-08-06



***


- 알 수 없는 get 에러가 난다. 이것도 데이터를 받기 전에 렌더링해서 그런 것 같은데 어디를 고쳐야할지 감이 안온다. 에러메세지는 localhost:5000/undefined 404 뿐이다.


- 대소문자를 잘 확인할 것. 모델이 정의 되어있지 않았다는 에러는 글자 하나가 대소문자가 바뀌어서 났던 것 같다. 근데 왜 괜찮아졌었지?


- 구독 기능 완료. ~인줄 알았지만 자기 자신의 영상에 들어갔을 때 구독버튼이 안보이게 하고싶은데 비디오의 작성자 아이디를 받아오기전에 렌더링해서 에러가 나는 것으로 보인다. 현재 코드로는 다 보이거나 다 안보이거나 둘 중 하나. 해결책은?


-> 해결책은 서버에서 받은 아이디를 바로 사용하는 것이었다. 전에는 useState에서 아이디를 가져오려고 했다. setstate되는 속도와 차이가 있어서 그랬던 것으로 추측된다.


- 구독영상페이지 - 구독한 사람의 영상을 보여주는 페이지 완료.

navBar에 user name을 <p></p>로 표시했더니 미친듯이 리렌더링되는 현상을 발견했다. 문제점은?


-> 자리가 부족하기 때문일까? - 아닌듯. 유저데이터를 사용하기 때문인듯 하다. 의미없는 스트링을 사용했을 때는 리렌더링이 발생하지 않았다.


-> antd <menu.item>가 문제였던 것 같다. 이것을 사용하지 않으니까 리렌더링이 발생하지 않는다.



댓글 기능 작성중. form 작성

2021-08-09



***


- 로그인 안한 사람이 영상을 눌렀을 때에 대한 처리를 해줘야한다. 무조건 유저가 구독했는지에 대한 정보를 가져오게 되어있기 때문에 로그인하지 않은 유저가 들어오면 에러가 난다. 로그인 정보는 무엇으로부터 가져올까?


-> 리덕스를 이용해서 가져왔다. 비로그인 유저 비디오 페이지 진입 시 구독정보 처리 isLogin ? fetchSubscribed() : not fetch // 에러가 나서 쿠키 userId를 사용했다.


-> 비로그인 유저가 구독버튼을 눌렀을 경우  isLogin ? (subs | unSubs) : alert("로그인이 필요한 기능입니다.")


- 댓글에도 같은 처리 필요. 구독영상 페이지에도 같은 처리 필요(리다이렉트 되기전 서버에 요청함). 서버에 요청을 하지않도록.


-> 이건 왜 리덕스에서 가져오려고하면 에러가 날까? 쿠키의 userId를 이용했다. 


-> (userId === "") ? alert("로그인이 필요한 기능입니다.") : fetch()


- 쿠키를 가져오는 일이 많아서 함수를 따로 뺐다.


- 영상삭제, 댓글 삭제등등 추가할 것.


- 서버 res의 key를 잘 확인할 것.


- 댓글 기능 완료. 댓글의 댓글 기능 에러. 확인중.

2021-08-10


***


- 댓글에 댓글을 달면 내용이 표시가 안됨. 클릭이벤트는 작동함. 확인해야할 것이 무엇인지. 렌더링함수는 작동함. 


-> 렌더링함수에서 return을 작성하지 않아서 생긴 문제였다.

2021-08-11