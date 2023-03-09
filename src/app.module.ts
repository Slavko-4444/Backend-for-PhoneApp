import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from 'config/database.config';
import { Administrator } from 'output/entities/Administrator';
import { Article } from 'output/entities/Article';
import { Photo } from 'output/entities/Photo';
import { User } from 'output/entities/User';
import { UserArticle } from 'output/entities/UserArticle';
import { UserInfo } from 'output/entities/UserInfo';
import { AppController } from './controllers/app.controller';
import { AppService } from './app.service';
import { AdministratorController } from './controllers/api/administrator.controller';
import { AdministratorService } from './services/administrator Service/administrator.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      username: DatabaseConfiguration.username,
      password: DatabaseConfiguration.password,
      database: DatabaseConfiguration.database,
      entities: [
        Administrator,
        Article,
        Photo,
        User,
        UserArticle,
        UserInfo,
      ],
    }),
    TypeOrmModule.forFeature(
      [
        Administrator,
        Article,
        Photo,
        User,
        UserArticle,
        UserInfo,
      ]),
    
  ],
  controllers: [AppController, AdministratorController],
  providers: [AppService, AdministratorService],
})
export class AppModule {}
