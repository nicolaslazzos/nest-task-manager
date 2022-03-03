import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFiltersDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(TasksRepository) private tasksRepository: TasksRepository) { }

  async getTasks(dto: GetTasksFiltersDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(dto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this.tasksRepository.findOne({ id, user });

    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);

    return task;
  }

  async createTask(dto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(dto, user);
  }

  async updateTaskStatus(id: string, dto: UpdateTaskStatusDto, user: User): Promise<Task> {
    const { status } = dto;

    const task: Task = await this.getTaskById(id, user);

    task.status = status;

    await this.tasksRepository.save(task);

    return task;
  }

  async deleteTaskById(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user });

    if (!result?.affected) throw new NotFoundException(`Task with ID ${id} not found`);
  }
}
