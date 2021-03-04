<html>
<head>
<script src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<link href="css/index.css" rel="stylesheet" type="text/css">
</head>
<body>

<div id="root"></div>

<script type="text/babel">
    
    const GetApi=()=>{
        const datas = @json($items);

        return(
            <div>
                <h1>表示</h1>
                <table>
                    <thead>
                        <tr><th>ID</th><th>名前</th><th>ユーザーID</th><th>コメント</th><th>パスワード</th><th>投稿日</th></tr>
                    </thead>
                    <tbody>
                        {datas.map((data)=>
                            <GetApiList data={data} key={data.id+data.writeDay} />)}
                    </tbody>
                </table>
            </div>
        )
    }
    

    const GetApiList=(props)=>{
        const {id, userName, userId, comment, userPass, writeDay}=props.data
        return(
            <tr>
                <td>{id}</td>
                <td>{userName}</td>
                <td>{userId}</td>
                <td>{comment}</td>
                <td>{userPass}</td>
                <td>{writeDay}</td>
            </tr>
        )
    }

    ReactDOM.render(
        <GetApi />,
        document.getElementById("root")
    )

</script>

@if (isset($msg))
    <p>{{$msg}}</p>
@endif


<table>
    <form action="" method="post" enctype="multipart/form-data">
        <tr><th>name:</th><td><input type="text" name="userName"></td></tr>
        <tr><th>ID:</th><td><input type="text" name="userId"></td></tr>
        <tr><th>comment:</th><td><textarea name="comment"></textarea></td></tr>
        <tr><th>pass:</th><td><input type="text" name="userPass"></td></tr>
        <input type="hidden" name="writeDay" value={{ \Carbon\Carbon::now() }}>
        <tr><th>file:</th><td><input type="file" name="fileName"></td></tr>
        <tr><td><input type="submit" value="submit"></td></tr>
    </form>

</table>

@foreach ($items as $item)
    <table>
        <tr>
            <th>ID</th>
            <th>ユーザー名</th>
            <th>ユーザーID</th>
            <th>コメント</th>
            <th>パスワード</th>
            <th>投稿日</th>
        </tr>
        <tr>
            <td>{{$item->id}}</td>
            <td>{{$item->userName}}</td>
            <td>{{$item->userId}}</td>
            <td>{{$item->comment}}</td>
            <td>{{$item->userPass}}</td>
            <td>{{$item->writeDay}}</td>
        </tr>

    </table>
    @if (!empty($item->fileName))
        @if ($item->extension=="mp4")

        @else
            <img src="storage/{{$item->fileName}}" alt="画像" width="100"><br>
        @endif
    @endif
    <li>
        <a href="/comment/edit/?id={{ $item->id }}">
        編集</a>
    </li>
    <li>
        <a href="/comment/delete/?id={{ $item->id }}">
        削除</a>
    </li>
@endforeach


</body>
<html>