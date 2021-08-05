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