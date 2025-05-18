<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Room;
use App\Models\User;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index()
    {
        $data = Booking::with('user', 'room')->get();
        return response()->json(['status' => 201, 'data' => $data]);
    }
    public function getByUserId($id)
    {
        $booking = Booking::where('user_id', $id)->with('room')->get();
        return response()->json(['data' => $booking]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required',
            'start_time' => 'required',
            'end_time' => 'required',
            'capacity' => 'required'
        ]);

        $room = Room::find($request->room_id);
        if ($request->capacity > $room->capacity) {
            return response()->json([
                'status' => 422,
                'errors' => ['Capacity exceeds room capacity']
            ], 422);
        }

        $exists = Booking::where('room_id', $request->room_id)
            ->where('date', $request->date)
            ->where('status', 'booked')
            ->where(function ($query) use ($request) {
                $query->whereBetween('start_time', [$request->start_time, $request->end_time])
                    ->orWhereBetween('end_time', [$request->start_time, $request->end_time])
                    ->orWhere(function ($q) use ($request) {
                        $q->where('start_time', '<=', $request->start_time)
                            ->where('end_time', '>=', $request->end_time);
                    });
            })
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'Room already booked at the selected time.'], 422);
        }

        $booking = new Booking();
        $booking->date = $request->date;
        $booking->start_time = $request->start_time;
        $booking->end_time = $request->end_time;
        $booking->room_id = $request->room_id;
        $booking->user_id = $request->user_id;
        $booking->save();

        return response()->json([
            'status' => 201,
            'message' => 'success',
            'data' => $booking->load('room')
        ]);
    }
    public function cancel($id)
    {
        $booking = Booking::find($id);
        $booking->status = 'cancelled';
        $booking->save();

        return response()->json(['status' => 201], 201);
    }
}
