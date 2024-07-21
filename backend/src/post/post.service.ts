import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { RecipePost } from './schemas/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<RecipePost>,
  ) {}
  async create(post: RecipePost): Promise<RecipePost> {
    try {
      console.log(post);

      if (
        !post.title ||
        !post.ingredients ||
        !post.instructions ||
        !post.preparationTime ||
        !post.cookingTime
      ) {
        throw new ConflictException('Missing required fields!');
      }
      const newPost = new this.postModel({
        title: post.title,
        ingredients: post.ingredients,
        instructions: post.instructions,
        preparationTime: post.preparationTime,
        cookingTime: post.cookingTime,
      });
      await newPost.save();
      return newPost;
    } catch (err) {
      console.error('Error creating post:', err);
      if (err instanceof ConflictException) {
        throw err;
      }
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  async update(id: string, updateRecipePost: RecipePost): Promise<RecipePost> {
    try {
      const existingRecipe = await this.postModel.findByIdAndUpdate(
        id,
        updateRecipePost,
        { new: true },
      );

      if (!existingRecipe) {
        throw new Error(`Something went wrong!`);
      }

      return existingRecipe;
    } catch (err) {
      console.error('Error updating post:', err);
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
