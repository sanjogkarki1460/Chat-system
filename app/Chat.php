<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    protected $fillable=['sender','receiver','message'];

    public function user_sender(){
        return $this->belongsTo('App\User','sender');
    }
}
