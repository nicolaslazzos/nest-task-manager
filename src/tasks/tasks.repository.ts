import { EntityRepository, Repository } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFiltersDto } from "./dto/get-tasks-filter.dto";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(dto: CreateTaskDto): Promise<Task> {
    const { title, description } = dto;

    const task = this.create({ title, description, status: TaskStatus.OPEN });

    await this.save(task);

    return task;
  }

  async getTasks(dto: GetTasksFiltersDto): Promise<Task[]> {
    const { search, status } = dto;

    const query = this.createQueryBuilder('task');

    if (status) query.andWhere('task.status = :status', { status });
    if (search) query.andWhere('LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE :search', { search: `%${search.toLowerCase()}%` });

    const tasks = await query.getMany();

    return tasks;
  }
}