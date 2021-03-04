<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use DB;
use App\User;
use App\Http\MiddleWare\Cors;
use PHPMailer\PHPMailer;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function prepost(Request $request)
    {
        
        $urlToken=$request->urlToken;
        $address="http://localhost:3000/signup/".$urlToken;
        $mails=$request->mails;
        $status="0";
        $preDates=date("Y-m-d H:i:s");

        $ress=DB::table('users')->where('mails', $mails)->orderBy('id', 'desc')->first();

        //メール送信(phpmailer)
        $text             = $address;
        $mail = new PHPMailer\PHPMailer();
        $mail->IsSMTP();
        // $mail->SMTPDebug  = 1; // debugging: 1 = errors and messages, 2 = messages only
        $mail->SMTPAuth   = true; // authentication enabled
        $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
        $mail->Host       = "smtp.gmail.com";
        $mail->Port       = 465; // or 587
        $mail->IsHTML(false);
        $mail->Username = "kazuki118050@gmail.com";
        $mail->Password = "Kazuki8050";

        $mail->AddAddress($mails, "受取人");
        $mail->From = "kazuki118050@gmail.com";
        $mail->FromName = mb_encode_mimeheader(mb_convert_encoding("ヤマサキカズキ","JIS","UTF-8"));
        $mail->Subject = mb_encode_mimeheader(mb_convert_encoding("下記リンクより本登録を行ってください。","JIS","UTF-8"));
        $mail->Body = mb_convert_encoding($address,"JIS","UTF-8");

        if ($ress){
            if ($ress->status!="0"){
                return response()->json("既に登録済みのメールアドレスです。");
            }else{
                return response()->json("以前お送りしたメールアドレスをお使いください。");
            }
        }else{
            if ($mail->Send()) {
                $article = new User;
                $article->urlToken = $urlToken;
                $article->mails = $mails;
                $article->userNames="0";
                $article->passwords="0";
                $article->preDates = $preDates;
                $article->status = $status;
                $article->save();
                return response()->json("ご登録のメールアドレスにURLを送信しました。");
            }else {
                return response()->json("メール送信に失敗しました。");
            }
        }
    }

    public function preget(Request $request)
    {
        $dates=date("Y-m-d H:i:s",strtotime("-1 day"));
        // $param=[$request->urlToken,$request->mails];
        $param=[$request->urlpara];
        // $article=User::find($param);
        $article=DB::table('users')->where('urlToken', $request->urlpara)->first();
        if (!$article){
            $error="該当しません。";
            return response()->json($error);
        }
        elseif ($article->status=="1"){
            $error="登録済みです。";
            return response()->json($error);
        }
        elseif ($article->predates<$dates){
            $error="期限切れです。";
            return response()->json($error);
        }
        else{
            return response()->json("本登録を行ってください。");
        }
    }

    public function mainpost(Request $request)
    {

        $article=DB::table('users')->where('userNames', $request->userNames)->first();
        if ($article){
            return response()->json("そのユーザー名は使用済みです。");
        }else{
            $todays=date("Y-m-d H:i:s");
            $param=[
                "urlToken"=>$request->urlToken,
                "userNames"=>$request->userNames,
                "passwords"=>$request->passwords,
                "predates"=>$todays,
                "status"=>"1",
            ];
            DB::update('update users set userNames=:userNames, passwords=:passwords, predates=:predates, status=:status where urlToken=:urlToken', $param);

            // $article=DB::table('users')->where('urlToken', $request->urlToken)->first();;

            
            // $article->userNames = $request->userNames;
            // $article->passwords = $request->passwords;
            // $article->predates = $todays;
            // $article->status = "1";
            // $article->save();

            // $alert="<script type='text/javascript'>
            // alert('登録完了しました。');</script>";
            // echo $alert;

            $users=DB::table('users')->where('urlToken', $request->urlToken)->first();;
            return response()->json($users,200);
        }
    }

    public function postlog(Request $request)
    {
        $article=DB::table('users')->where('userNames', $request->userNames)->first();
        if (!$article){
            $error="ユーザー名が一致しません";
            return response()->json($error);
        }else{
            if ($article->status!="1"){
                $error="未登録のユーザーです。";
                return response()->json($error);
            }
            else if ($article->passwords!=$request->passwords){
                $error="パスワードが違います。";
                return response()->json($error);
            }else{
                return response()->json("ログインしました。");
            }
        }
    }
}
