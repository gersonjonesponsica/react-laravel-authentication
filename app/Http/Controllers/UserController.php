<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
//use JWTAuth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\PayloadFactory;
use Tymon\JWTAuth\JWTManager as JWT;

class UserController extends Controller
{   

    public function register(Request $request)
    {
        $messages = [
            'fname.required' => 'First name field is required',
            'fname' => 'First name must be string',
            'fname.max' => 'First name must be atleast 100 characters',

            'lname.required' => 'Last name field is required',
            'lname' => 'Last name must be string',
            'lname.max' => 'Last name must be atleast 100 characters',

            'email.required' => 'Email field is required',
            'email.max' => 'Email must be atleast 100 characters',
            'email' => 'Email must be a valid email address',
            'email.unique' => 'Email has already been taken',

            'password' => 'password',
            'password.required' => 'Password field is required',
            'password.min' => 'Password must be atleast 6 characters',
          ];
        $validator = Validator::make($request->json()->all() , [
            'fname' => 'required|string|max:100',
            'lname' => 'required|string|max:100',
            'email' => 'required|string|email|max:50|unique:users',
            'password' => 'required|string|min:6', 
        ],$messages);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson());
        }

        $user = User::create([
            'fname' => $request->json()->get('fname'),
            'lname' => $request->json()->get('lname'),
            'email' => $request->json()->get('email'),
            'password' => Hash::make($request->json()->get('password')),
        ]);

        if (!$user){
            return response()->json(['error' => 'something went wrong'], 500);
        }

        // $credentials = ['email' => $request->get('email'),'password' => $request->get('password')]; 
        return $this->login($request);
    }
    
    public function login(Request $request)
    {

        $credentials = $request->json()->all();

        $validator = Validator::make($credentials , [
            'email' => 'required|string|email|max:50',
            'password' => 'required|string|min:6', 
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        $user = auth()->user();

        return response()->json(['user' => $user, 'token' => $token], 200);
       // return response()->json( compact('token') );
    }

    

    public function getAuthenticatedUser()
    {
        try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }
        return response()->json(compact('user'));
    }

}
