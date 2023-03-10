import { Body, Controller, Param, Patch, Post } from '@nestjs/common'
import { Crud } from '@nestjsx/crud'
import { Article } from 'output/entities/Article'
import { ArticleDto } from 'src/dto/article/add.article.dto'
import { ApiResponse } from 'src/msci/api.response'
import { ArticleService } from 'src/services/Article Service/article.service'



@Controller('api/articles')
@Crud(
    {
        model: {
            type: Article
        },
        params: {
            id: {
                field: 'articleId',
                type: 'number',
                primary: true
            }
        },
        query: {
            join: {
                photos: {
                    eager: true
                },
                userArticles: {
                    eager: true
                }
            }
        },
        routes: {
            only: [ "getManyBase", "getOneBase"],
        }
    }
)
    
export class ArticleController {
    constructor(private service: ArticleService)
    {}

    //POST  http://localhost:3000/api/articles
    @Post()
    addArticle(@Body() data: ArticleDto): Promise<Article | ApiResponse>{
        return this.service.addNewArticle(data);
    }
     //PATCH  http://localhost:3000/api/articles/2
    @Patch(':id')
    editArticle(@Param('id') articleId: number, @Body() data: ArticleDto): Promise<Article | ApiResponse>{
        return this.service.editArticle(articleId, data);
    }
}