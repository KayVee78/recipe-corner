import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateReviewDto } from './dto/update-review.dto';
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
      if (!review.review || !review.username) {
        throw new InternalServerErrorException('Something went wrong!');
      }
      const newReview = new this.reviewModel({
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

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
