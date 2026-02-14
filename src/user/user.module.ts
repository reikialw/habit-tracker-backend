import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HabitService } from 'src/habit/habit.service';
import { Habit } from 'src/habit/habit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Habit])],
  providers: [UserService, HabitService],
  controllers: [UserController],
})
export class UserModule {}
