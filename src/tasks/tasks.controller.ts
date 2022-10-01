import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
  UsePipes,
  ValidationPipe,
  Query,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { Task } from './entities/task.entity';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipes';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';

import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TaskController {
  constructor(private tasksService: TasksService) {}

  private logger = new Logger('TaskController');

  //Get one task
  @Get(':id')
  getTaskById(@Param('id') id: number, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDTO: GetTasksFilterDTO,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(
        filterDTO,
      )}`,
    );
    return this.tasksService.getTasksWithFilters(filterDTO, user);
  }

  //Create a task
  @Post('create-task')
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDTO: CreateTaskDTO,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `User "${user.username}" creating a new task. Data: ${JSON.stringify(
        createTaskDTO,
      )}`,
    );
    return this.tasksService.createTask(createTaskDTO, user);
  }

  //Delete a task
  @Delete(':taskId')
  deleteTask(@Param('taskId') id: number, @GetUser() user: User) {
    this.tasksService.deleteTask(id, user);
  }

  //Update a task
  @Patch(':taskId/status')
  updateTaskStatus(
    @Param('taskId') id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status, user);
  }

  // @Get()
  // getTasks(@Query() filterDTO: GetTasksFilterDTO): Task[] {
  //   if (Object.keys(filterDTO).length) {
  //     return this.tasksService.getTasksWithFilters(filterDTO);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }

  // @Get(':taskId')
  // getSingleTask(@Param('taskId') id: string): Task {
  //   return this.tasksService.getSingleTask(id);
  // }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
  //   return this.tasksService.createTask(createTaskDTO);
  // }

  // @Delete(':taskId')
  // deleteTask(@Param('taskId') id: string): Task[] {
  //   return this.tasksService.deleteTask(id);
  // }

  // @Patch(':taskId/status')
  // updateTaskStatus(
  //   @Param('taskId') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  // ): Task {
  //   return this.tasksService.updateTaskStatus(id, status);
  // }
}
