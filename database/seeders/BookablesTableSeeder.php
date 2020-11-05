<?php

namespace Database\Seeders;

use App\Models\Bookable;
use Database\Factories\BookableFactory;
use Illuminate\Database\Seeder;

class BookablesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Bookable::factory()->times(50)->create();
    }
}
