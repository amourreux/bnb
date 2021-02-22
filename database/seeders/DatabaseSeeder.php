<?php

namespace Database\Seeders;

use App\Models\Bookable;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        Bookable::factory()->times(50)->create();
        //$this->call(BookablesTableSeeder::class);
        $this->call(BookingsTableSeeder::class);
    }
}
