import { Controller } from '@nestjs/common';
import { Get, Post, Patch, Body } from '@nestjs/common';
import { HabitService } from './habit.service';
import { CreateHabitDto } from './dto/create-habit.dto';

@Controller('habit')
export class HabitController {

    constructor(private readonly habitService: HabitService) {}

    @Post()
    create(@Body() dto: CreateHabitDto) {
        return this.habitService.create(dto);
    }

    @Get()
    findAll() {
        return this.habitService.findAll();
    }
}
