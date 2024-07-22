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
      if (
        !post.title ||
        !post.ingredients ||
        !post.instructions ||
        !post.preparationTime ||
        !post.cookingTime ||
        !post.photo ||
        !post.category
      ) {
        throw new ConflictException('Missing required fields!');
      }
      const newPost = new this.postModel({
        title: post.title,
        ingredients: post.ingredients,
        instructions: post.instructions,
        preparationTime: post.preparationTime,
        cookingTime: post.cookingTime,
        username: post.username,
        photo: post.photo,
        userId: post.userId,
        category: post.category,
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

  async findAll(
    keyword?: string,
    ingredient?: string,
    category?: string,
  ): Promise<RecipePost[]> {
    const query: any = {};

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { instructions: { $regex: keyword, $options: 'i' } },
      ];
    }

    if (ingredient) {
      query.ingredients = { $regex: ingredient, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    return this.postModel.find(query).exec();
  }

  async findOne(id: string) {
    try {
      console.log('id', id);

      const post = await this.postModel.findById(id).exec();
      if (!post) {
        throw new NotFoundException('No Recipe Found');
      }
      return post;
    } catch (err) {
      console.error('No Recipe Found', err);
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new InternalServerErrorException('Something went wrong!');
    }
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
