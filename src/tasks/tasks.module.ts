import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { AuthModule } from '../auth/auth.module';

/*
because the tasks controller is defined as a controller in this module and the
tasks service is defined as a provider in this module and also has the @Injectable decorator,
so that allows the tasks service to be injected and then used in the tasks controller
*/

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  // imports, injects dependencies to be able to use them anywhere inside the current module
  imports: [TypeOrmModule.forFeature([TasksRepository]), AuthModule]
})
export class TasksModule { }
