import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getSingleTask(id: string): Task {
    const taskFound = this.tasks.find((task) => task.id === id);
    if (!taskFound) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return taskFound;
  }

  createTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): Task[] {
    const taskFound = this.getSingleTask(id);
    this.tasks = this.tasks.filter((task) => task.id !== taskFound.id);
    return this.tasks;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getSingleTask(id);
    task.status = status;
    return task;
  }
}
