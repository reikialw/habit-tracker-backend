import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habit } from './habit.entity';
import { User } from 'src/user/user.entity';
import { CreateHabitDto } from './dto/create-habit.dto';

@Injectable()
export class HabitService {

    constructor(
        @InjectRepository(Habit)
        private habitRepository: Repository<Habit>,

        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(dto: CreateHabitDto): Promise<Habit> {

        //To a habit to be created, we need an user first
        const user = await this.userRepository.findOneBy({

            //Always use the DTO for database fields, the TypeORM will resolve FK
            id: dto.userId,
        });

        if(!user) {
            throw new NotFoundException('User not found');
        }

        //Create the habit for the user
        const habit = await this.habitRepository.create({
            title: dto.title,
            user,
        });

        //Save the created object in database
        return this.habitRepository.save(habit);
    }

    //Find all habits for one specific user
    findAll() {

        return this.habitRepository.find({
            relations: ['user'],
        });
    }
}
