//defines the structure of data and the types of fields that User can have

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserWithoutPassword = Omit<User, 'password'>;
export type LoginUser = Omit<User, 'email'>;
