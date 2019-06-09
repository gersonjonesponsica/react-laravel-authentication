<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Task;

class TaskController extends Controller
{
    public function index()
    {
        return Task::all();
    }
 
    public function show($id)
    {
        return Task::find($id);
    }

    public function store(Request $request)
    {
        $messages = [
            'title.required' => 'Title field is required',
            'title' => 'Title must be string',
            'title.max' => 'Title must be atleast 100 characters'
          ];
        $validator = Validator::make($request->json()->all() , [
            'title' => 'required|string|max:100',
        ],$messages);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        return Task::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $messages = [
            'title.required' => 'Title field is required',
            'title' => 'Title must be string',
            'title.max' => 'Title must be atleast 100 characters'
          ];
        $validator = Validator::make($request->json()->all() , [
            'title' => 'required|string|max:100',
        ],$messages);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $task = Task::findOrFail($id);
        $task->update($request->all());

        return response()->json($task, 204);
    }

    public function delete(Request $request, $id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return 204;
    }

    public function rule(){
        
    }
}
