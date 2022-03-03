import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TaskStatus } from './task-status.enum';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = { id: 'mockId', username: 'mockUsername', password: 'mockPassword', tasks: [] };

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository: TasksRepository;

  beforeEach(async () => {
    // initialize a nest module with the tasks service and repository
    const module = await Test.createTestingModule({
      providers: [TasksService, { provide: TasksRepository, useFactory: mockTasksRepository }]
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    tasksRepository = module.get<TasksRepository>(TasksRepository);
  });

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', async () => {
      expect(tasksRepository.getTasks).not.toHaveBeenCalled();

      const mockResult = 'mockResult';

      // @ts-ignore
      tasksRepository.getTasks.mockResolvedValue(mockResult);

      const result = await tasksService.getTasks({}, mockUser);

      expect(tasksRepository.getTasks).toHaveBeenCalled();

      expect(result).toEqual(mockResult);
    });
  });

  describe('getTaskById', () => {
    it('calls TasksRepository.findOne and returns the result', async () => {
      expect(tasksRepository.findOne).not.toHaveBeenCalled();

      const mockTask = { title: 'Mock title', description: 'Mock description', id: 'mockId', status: TaskStatus.OPEN };

      // @ts-ignore
      tasksRepository.findOne.mockResolvedValue(mockTask);

      const result = await tasksService.getTaskById(mockTask.id, mockUser);

      expect(tasksRepository.findOne).toHaveBeenCalled();

      expect(result.id).toEqual(mockTask.id);
    });

    it('calls TasksRepository.findOne and handles an error', async () => {
      expect(tasksRepository.findOne).not.toHaveBeenCalled();

      // @ts-ignore
      tasksRepository.findOne.mockResolvedValue(null);

      expect(tasksService.getTaskById('mockId', mockUser)).rejects.toThrow(NotFoundException);
    });
  });
});