// src/habit/dto/create-habit.dto.ts
import { IsString, IsUUID } from 'class-validator';

export class CreateHabitDto {
  @IsString()
  title: string;

  @IsUUID()
  userId: string;
}
