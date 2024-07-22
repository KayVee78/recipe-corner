//defines the structure of data and the types of fields that User can have

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Review {
  @Prop()
  username: string;

  @Prop()
  review: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
