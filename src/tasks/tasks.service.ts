import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';

import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFiltersDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(dto: GetTasksFiltersDto): Task[] {
    const { search, status } = dto;

    return this.tasks.filter(task => {
      let matches = true;

      matches = matches && !(status && task.status !== status);

      matches = matches && !(search && (!task.title.toLowerCase().includes(search.toLowerCase()) && !task.description.toLowerCase().includes(search.toLowerCase())));

      return matches;
    });
  }

  getTaskById(id: string) {
    return this.tasks.find(task => task.id === id);
  }

  createTask(dto: CreateTaskDto): Task {
    const { title, description } = dto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN
    };

    this.tasks.push(task);

    return task;
  }

  updateTaskStatus(id: string, dto: UpdateTaskStatusDto): Task {
    const { status } = dto;

    let task: Task;

    this.tasks = this.tasks.map(t => {
      if (t.id === id) {
        task = { ...t, status };
        return task;
      } else {
        return t;
      }
    });

    return task;
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}
