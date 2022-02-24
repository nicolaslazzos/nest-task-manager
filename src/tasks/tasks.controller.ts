import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFiltersDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  /*
  to inject the tasks service in the tasks controller, we define an empty constructor
  with a parameter of the type of the service specifying an accessor (private in this case)
  declaring it with the accessor will automatically create the property in the controller class
  */

  constructor(private tasksService: TasksService) { }

  @Get()
  getTasks(@Query() query: GetTasksFiltersDto): Task[] {
    if (Object.keys(query).length) return this.tasksService.getTasksWithFilters(query);

    return this.tasksService.getTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() body: CreateTaskDto): Task {
    return this.tasksService.createTask(body);
  }

  @Patch('/:id/status')
  updateTask(@Param('id') id: string, @Body() body: UpdateTaskStatusDto): Task {
    return this.tasksService.updateTaskStatus(id, body);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    return this.tasksService.deleteTaskById(id);
  }
}
