import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { ArticleController } from './controllers/api/article.controller';
import { ArticleService } from './services/Article Service/article.service';
import { AuthController } from './controllers/api/auth.controller';
import { AuthMiddleWare } from './middleware/authorization.middleware';
import { UserService } from './services/User Service/user.service';

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
  controllers: [AppController, AdministratorController, ArticleController, AuthController, ],
  providers: [AppService, AdministratorService, ArticleService, UserService, ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleWare)
      .exclude('auth/*')
      .forRoutes('api/*');
  }

}
