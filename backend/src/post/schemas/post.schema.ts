//defines the structure of data and the types of fields that User can have

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class RecipePost {
  @Prop()
  title: string;

  @Prop()
  ingredients: string;

  @Prop()
  instructions: string;

  @Prop()
  preparationTime: string;

  @Prop()
  cookingTime: string;

  @Prop()
  username: string;

  @Prop()
  photo: string;

  @Prop()
  userId: string;

  @Prop()
  category: string;
}

export const PostSchema = SchemaFactory.createForClass(RecipePost);
