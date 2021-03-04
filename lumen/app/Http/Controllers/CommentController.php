<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use DB;
use App\Comment;
use App\Http\MiddleWare\Cors;

class CommentController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    //API作成 お試し
    public function getapi(Request $request){
        $comments=Comment::all();
        return response()->json($comments,200);
    }

    public function postapi(Request $request)
    {
        $counts=DB::select("select id from comments");
        $number=count($counts)+1;

        if ($request->fileName){

            $extension=$request->extension;
            $fileRename=$request->fileName;
            
        }else{
            $fileRename=NULL;
            $extension=NULL;
        }

        $article = new Comment;
        $article->id = $number;
        $article->userName = $request->userName;
        $article->comment = $request->comment;
        $article->userPass = $request->userPass;
        $article->writeDay = $request->writeDay;
        $article->fileName = $fileRename;
        $article->extension = $extension;
        $article->save();

        $comments=Comment::all();
        return response()->json($comments,200);
    }

    public function deleteapi(Request $request){
        $param=$request->id;
        $article = Comment::find($param);
        $article->delete();

        $num=Comment::count();
        for ($param;$param<=($num);$param++){
            Comment::where('id', $param+1)
                ->update(['id' => $param]);
        }
        
        $comments=Comment::all();
        return response()->json($comments,200);
    }

    public function editapi(Request $request){
        $article=Comment::find($request->id);
        $article->comment = $request->comment;
        $article->writeDay = $request->writeDay;
        $article->save();
        $comments=Comment::all();
        return response()->json($comments,200);
    }


// ---------------apiここまで-----------------




    public function getAll(Request $request)
    {
        //
        $items=DB::select("select * from comments");
        return view("comment.index",["items"=>$items]);
    }

    public function post(Request $request){
        $counts=DB::select("select id from comments");
        $number=count($counts)+1;

        if ($request->fileName){

            $extension=$request->fileName->extension();

            if ($extension=="gif" || $extension=="jpeg" || $extension=="jpg" || $extension=="png" || $extension=="mp4")
            {
                $fileNum=uniqid();
                $fileRename=$fileNum.'.'.$extension;
                $request->file("fileName")->storeAs("/public",$fileRename);
                // $request->file("fileName")->storeAs("../../public/storage",$fileRename);
            }

            $param=[
                "id"=>$number,
                "userName"=>$request->userName,
                "userId"=>$request->userId,
                "comment"=>$request->comment,
                "userPass"=>$request->userPass,
                "writeDay"=>$request->writeDay,
                "fileName"=>$fileRename,
                "extension"=>$extension,
            ];
            
        }else{

            $param=[
                "id"=>$number,
                "userName"=>$request->userName,
                "userId"=>$request->userId,
                "comment"=>$request->comment,
                "userPass"=>$request->userPass,
                "writeDay"=>$request->writeDay,
                "fileName"=>NULL,
                "extension"=>NULL
            ];

        };
        DB::insert("insert into comments (id,userName,userId,comment,userPass,writeDay,fileName,extension)
            values (:id,:userName,:userId,:comment,:userPass,:writeDay,:fileName,:extension)",$param);
        return redirect("/comment");

    }

    public function edit(Request $request){
        $param=["id"=>$request->id];

        $item=DB::select("select * from comments where id=:id",$param);
        return view("comment.edit",["item"=>$item[0]]);
    }

    public function update(Request $request){
        $param=[
            "id"=>$request->id,
            "userName"=>$request->userName,
            "userId"=>$request->userId,
            "comment"=>$request->comment,
            "writeDay"=>$request->writeDay,
        ];
        $nums=["id"=>$request->id,"userPass"=>$request->updatePass];

        $item=DB::select("select * from comments where id=:id && userPass=:userPass",$nums);
        if (empty($item)){
            $alert="<script type='text/javascript'>
            alert('パスワードが違います。');</script>";
            echo $alert;
            return redirect("comment");
        }else{
        DB::update("update comments set userName=:userName,userId=:userId,comment=:comment,
            writeDay=:writeDay where id=:id",$param);
            return redirect("comment");
        };

    }

    public function delete(Request $request){
        $param=["id"=>$request->id];

        $item=DB::select("select * from comments where id=:id",$param);
        return view("comment.delete",["item"=>$item[0]]);
    }

    public function remove(Request $request){
        $nums=["id"=>$request->id,"userPass"=>$request->deletePass];
        $param=["id"=>$request->id];
        $num=$request->id;

        $item=DB::select("select * from comments where id=:id && userPass=:userPass",$nums);
        if (empty($item)){
            $alert="<script type='text/javascript'>
            alert('パスワードが違います。');</script>";
            echo $alert;
            return redirect("comment");
        }else{
            DB::delete("delete from comments where id=:id", $param);

            
            if ($num==1){
                return redirect("comment");
            }else{
                ##削除した分の番号をずらす
                $counts=DB::select("select id from comments");
                $number=count($counts);
                for ($num;$num<=($number+1);$num++){
                    $params=["num_1"=>$num-1,"num"=>$num];
                    DB::update("update comments set id=:num_1 where id=:num",$params);
                }

                return redirect("comment");
            };
        };
    }

    
}
