import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from './schemas/review.schema';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  addBook(@Body() review: Review): Promise<Review> {
    return this.reviewService.create(review);
  }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':recipeId')
  findOne(@Param('recipeId') recipeId: string) {
    return this.reviewService.findOne(recipeId);
  }
}
