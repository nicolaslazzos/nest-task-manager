import { Task } from "../tasks/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // eager == true means that whenever we fetch the user from the db, it will also fetch the tasks
  @OneToMany(_type => Task, task => task.user, { eager: true })
  tasks: Task[];
}