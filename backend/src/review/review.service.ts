import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Review } from './schemas/review.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel('Review') private readonly reviewModel: Model<Review>,
  ) {}

  async create(review: Review): Promise<Review> {
    try {
      if (!review.review || !review.username || !review.recipeId) {
        throw new InternalServerErrorException('Something went wrong!');
      }
      const newReview = new this.reviewModel({
        recipeId: review.recipeId,
        review: review.review,
        username: review.username,
      });
      await newReview.save();
      return newReview;
    } catch (err) {
      console.error('Error creating post:', err);
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  async findAll(): Promise<Review[]> {
    return this.reviewModel.find().exec();
  }

  async findOne(recipeId: string): Promise<Review[]> {
    try {
      const reviews = await this.reviewModel.find({ recipeId }).exec();
      if (!reviews) {
        throw new NotFoundException('No Review Found');
      }
      return reviews;
    } catch (err) {
      console.error('No Review Found', err);
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new InternalServerErrorException('Something went wrong!');
    }
  }
}
