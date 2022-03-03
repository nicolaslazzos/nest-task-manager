import { EntityRepository, Repository } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFiltersDto } from "./dto/get-tasks-filter.dto";
import { Task } from "./task.entity";
import { User } from "../auth/user.entity";
import { Logger } from "@nestjs/common";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  private logger = new Logger('TasksRepository', { timestamp: true });

  async createTask(dto: CreateTaskDto, user: User): Promise<Task> {
    try {
      const { title, description } = dto;

      const task = this.create({ title, description, status: TaskStatus.OPEN, user });

      await this.save(task);

      return task;
    } catch (e) {
      this.logger.error(`Failed to create task for user ${user.username} with data ${JSON.stringify(dto)}`, e.stack);

      throw e;
    }
  }

  async getTasks(dto: GetTasksFiltersDto, user: User): Promise<Task[]> {
    try {
      const { search, status } = dto;

      const query = this.createQueryBuilder('task');

      query.where({ user });

      if (status) query.andWhere('task.status = :status', { status });
      if (search) query.andWhere('(LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE :search)', { search: `%${search.toLowerCase()}%` });

      const tasks = await query.getMany();

      return tasks;
    } catch (e) {
      this.logger.error(`Failed to get tasks for user ${user.username} with filters ${JSON.stringify(dto)}`, e.stack);

      throw e;
    }
  }
}