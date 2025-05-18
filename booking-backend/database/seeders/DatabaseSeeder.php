<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make(12345678),
            'role' => 'admin'
        ]);

        $room = [
            [
                'name' => 'Room 1',
                'Location' => 'A1',
                'capacity' => 20
            ],
            [
                'name' => 'Room 2',
                'Location' => 'A2',
                'capacity' => 20
            ],
            [
                'name' => 'Room 3',
                'Location' => 'A3',
                'capacity' => 20
            ],
            [
                'name' => 'Room 4',
                'Location' => 'A4',
                'capacity' => 20
            ],
        ];
        Room::insert($room);
    }
}
