import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: [`.env.stage.${process.env.STAGE}`], validationSchema: configValidationSchema }),
    TasksModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      // initializing the TypeOrmModule async to wait the ConfigModule initialization so we can use the env variables
      imports: [ConfigModule], // we import the ConfigModule
      inject: [ConfigService], // and then from the ConfigModule, we inject the ConfigService
      useFactory: async (configService: ConfigService) => {
        const isProd = configService.get('STAGE') === 'prod';

        return {
          ssl: isProd,
          extra: { ssl: isProd ? { rejectUnauthorized: false } : null },
          type: 'postgres',
          host: configService.get('POSTGRES_HOST'),
          port: configService.get('POSTGRES_PORT'),
          username: configService.get('POSTGRES_USERNAME'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DATABASE'),
          autoLoadEntities: true,
          synchronize: true
        };
      }
    }),
  ],
})
export class AppModule { }
