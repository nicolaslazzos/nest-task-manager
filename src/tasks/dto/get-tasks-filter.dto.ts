import { TaskStatus } from "../task.model";

export class GetTasksFiltersDto {
  search?: string;
  status?: TaskStatus;
}