<?php

use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
})->middleware('guest');

// route::get('chat/{id}','ChatController@chat')->middleware('auth')->name('chat');

route::post('/send', 'ChatController@send')->middleware('auth');
route::get('/user', 'ChatController@Getalluser')->middleware('auth');
route::get('/user/{id}', 'ChatController@Getfrienddetail')->middleware('auth');
route::get('/message/{id}','ChatController@GetAllMessage')->middleware('auth');
Auth::routes();


Route::get('/{any?}', function () {
    return view('Home');
})->where('any', '^(?!api).*$');
