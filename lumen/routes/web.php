<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->get("/sample",function(){
    return view("sample.index");
});

$router->get("comment","CommentController@getAll");
$router->post("comment","CommentController@post");
$router->get("comment/edit","CommentController@edit");
$router->post("comment/edit","CommentController@update");
$router->get("comment/delete","CommentController@delete");
$router->post("comment/delete","CommentController@remove");

// $router->group( ['middleware' => 'api'], function() use($router){
//     $router->get('/getapi', 'CommentController@getapi');
// });
$router->get("/getapi","CommentController@getapi");
$router->post("/getapi","CommentController@postapi");
$router->post("/getapi/del","CommentController@deleteapi");
$router->post("/getapi/edit","CommentController@editapi");

$router->post("/signupapi","UserController@prepost");
$router->post("/signinapi","UserController@preget");
$router->post("/signinfinal","UserController@mainpost");
$router->post("/login","UserController@postlog");
