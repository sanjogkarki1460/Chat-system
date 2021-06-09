<?php

namespace App\Http\Controllers;

use App\Chat;
use App\Events\ChatEvent;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function chat()
    {
        return view('chat');
    }

    public function send(Request $request)
    {
        // dd($request->all());
        $sender = auth()->user();
        $message = $request->message;
        $chat = Chat::create([
            'sender' => $sender->id,
            'receiver' => $request->receiver,
            'message' => $request->message
        ]);
        event(new ChatEvent($chat));
    }

    public function Getalluser()
    {
        $user = User::where('id', '!=', auth()->user()->id)->get();
        return $user;
    }

    public function GetAllMessage($id)
    {
        $message = Chat::where(function ($q) use ($id) {
            $q->where('sender', auth()->user()->id)
                ->where('receiver', $id);
        })->orWhere(function ($q) use ($id) {
            $q->where('receiver', auth()->user()->id)
                ->where('sender', $id);
        })->with('user_sender')
        ->get();    
        return $message;
    }

    public function Getfrienddetail($id){
        $friend=User::find($id)->name;
        return $friend;
    }
}
