<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    //Function for handling login
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();

        /* @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        // Get token
        $token = $user->createToken('main')->plainTextToken;

        // Return Response
        // return response()->json(['token' => $token, 'user' => $user]);
        return response(compact('token', 'user'));
    }

    // Function for handling signup requests
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response(['message' => 'Invalid login credentials', 422]);
            // return response()->json(['error' => 'Invalid login credentials.'], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('token', 'user'));
    }

    // Function for handling logout requests
    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
