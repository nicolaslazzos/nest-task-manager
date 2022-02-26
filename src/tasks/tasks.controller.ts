import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFiltersDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user-decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  /*
  to inject the tasks service in the tasks controller, we define an empty constructor
  with a parameter of the type of the service specifying an accessor (private in this case)
  declaring it with the accessor will automatically create the property in the controller class
  */

  constructor(private tasksService: TasksService) { }

  @Get()
  getTasks(@Query() query: GetTasksFiltersDto, @GetUser() user: User): Promise<Task[]> {
    return this.tasksService.getTasks(query, user);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  createTask(@Body() body: CreateTaskDto, @GetUser() user: User): Promise<Task> {
    return this.tasksService.createTask(body, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id: string, @Body() body: UpdateTaskStatusDto, @GetUser() user: User): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, body, user);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTaskById(id, user);
  }
}
