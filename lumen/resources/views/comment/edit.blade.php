<h1>編集ページ</h1>

<table>
    <form action="/comment/edit" method="post" enctype="multipart/form-data">
        <input type="hidden" name="id" value="{{$item->id}}">
        <tr><th>name:</th><td><input type="text" name="userName" value="{{$item->userName}}"></td></tr>
        <tr><th>ID:</th><td><input type="text" name="userId" value="{{$item->userId}}"></td></tr>
        <tr><th>comment:</th><td><textarea name="comment">{{$item->comment}}</textarea></td></tr>
        <input type="hidden" name="writeDay" value={{ \Carbon\Carbon::now() }}><br>
        <tr><th>パスワード:</th><td><input type="text" name="updatePass"></td></tr>
        <tr><td><input type="submit" value="edit"></td></tr>
    </form>
</table>