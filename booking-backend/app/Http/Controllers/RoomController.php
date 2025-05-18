<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function index()
    {
        $data = Room::all();
        return response()->json(['data' => $data]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:rooms',
            'location' => 'nullable|string|max:255|unique:rooms',
            'capacity' => 'nullable|integer|min:1',
        ]);

        $room = new Room();
        $room->name = $request->name;
        $room->location = $request->location;
        $room->capacity = $request->capacity;
        $room->save();

        return response()->json([
            'message' => 'Room created successfully',
            'data' => $room
        ], 201);
    }
    public function destroy(Room $room)
    {
        $room->delete();
        return response()->json([
            'message' => 'Room deleted successfully.',
        ]);
    }
}
