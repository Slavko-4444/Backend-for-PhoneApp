import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Article } from 'output/entities/Article';
import { resolve } from 'path';
import { ArticleDto } from 'src/dto/article/add.article.dto';
import { ApiResponse } from 'src/msci/api.response';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService extends TypeOrmCrudService<Article>{
    constructor(
        @InjectRepository(Article)
        private readonly article: Repository<Article>
    ) {
        super(article)
    }
    
    addNewArticle(data: ArticleDto): Promise<Article | ApiResponse> {
        
        const newArticle: Article = new Article();

        newArticle.excerpt = data.excerpt;
        newArticle.description = data.description;
        newArticle.status = data.status;
        newArticle.title = data.title;

       return new Promise((resolve) => {
            this.article.save(newArticle)
                .then(response => resolve(this.article.findOne({
                    where: { articleId: response.articleId },
                    relations: {
                        photos: true,
                        userArticles: true
                    }
                })))
                .catch(err => resolve( new ApiResponse('Not Saved', -9001, 'Unsuccessful article save.')))
        })
    }
    async editArticle(id: number,data: ArticleDto): Promise<Article | ApiResponse> {
        
        const newArticle: Article = await this.article.findOneById(id);

        if (!newArticle)
            return new ApiResponse('Not Found', -9002, 'Cannot find specified article for change');
        
                
        newArticle.excerpt = data.excerpt;
        newArticle.description = data.description;
        newArticle.status = data.status;
        newArticle.title = data.title;

       return new Promise((resolve) => {
            this.article.save(newArticle)
                .then(response => resolve(this.article.findOne({
                    where: { articleId: response.articleId },
                    relations: {
                        photos: true,
                        userArticles: true
                    }
                })))
                .catch(err => resolve( new ApiResponse('error', -9001, 'Unsuccessful article save.')))
        })
    }


}
