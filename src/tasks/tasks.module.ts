import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Task } from './entities/task.entity';
import { TaskController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TaskController],
  providers: [TasksService],
  imports: [TypeOrmModule.forFeature([Task]), AuthModule],
})
export class TasksModule {}
