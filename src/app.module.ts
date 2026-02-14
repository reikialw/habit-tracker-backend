import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { HabitModule } from './habit/habit.module';
import { Habit } from './habit/habit.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Habit],
      synchronize: false,
    }),
    UserModule,
    HabitModule,
  ],
})
export class AppModule {}
