import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { RecipePost } from './schemas/post.schema';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Post()
  addBook(@Body() post: RecipePost): Promise<RecipePost> {
    return this.postService.create(post);
  }

  @Get()
  findAll(
    @Query('keyword') keyword?: string,
    @Query('ingredient') ingredient?: string,
    @Query('category') category?: string,
  ) {
    return this.postService.findAll(keyword, ingredient, category);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecipePost: RecipePost,
  ): Promise<RecipePost> {
    return this.postService.update(id, updateRecipePost);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
