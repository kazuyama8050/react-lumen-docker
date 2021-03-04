<h1>削除ページ</h1>

<table>
    <form action="/comment/delete" method="post" enctype="multipart/form-data">
        <input type="hidden" name="id" value="{{$item->id}}">
        <tr><th>name:</th><td>{{$item->userName}}</td></tr>
        <tr><th>ID:</th><td>{{$item->userId}}</td></tr>
        <tr><th>comment:</th><td>{{$item->comment}}</td></tr>
        <tr><th>パスワード:</th><td><input type="text" name="deletePass"></td></tr>
        <tr><td><input type="submit" value="delete"></td></tr>
    </form>
</table>