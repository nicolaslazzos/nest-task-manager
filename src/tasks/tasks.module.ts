import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

/*
because the tasks controller is defined as a controller in this module and the
tasks service is defined as a provider in this module and also has the @Injectable decorator,
so that allows the tasks service to be injected and then used in the tasks controller
*/

@Module({
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
