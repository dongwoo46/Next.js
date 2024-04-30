import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { TasksService } from './tasks/tasks.service';
import { TasksModule } from './tasks/tasks.module';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerModule } from './logger/logger.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UploadsModule } from './uploads/uploads.module';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import { ArticleModule } from './article/article.module';
import { Article } from './article/entities/article.entity';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'test',
      entities: [User, Article],
      synchronize: true,
    }),
    UsersModule,
    UploadsModule,
    TasksModule,
    ScheduleModule.forRoot(),
    LoggerModule,
    EventEmitterModule.forRoot(),
    UploadsModule,
    AuthModule,
    CaslModule,
    ArticleModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, TasksService],
})

//EntityManager 객체 프로젝트 전체 주입
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
