//business logic for the resource, interacts with model to perform CRUD operations
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async create(user: User): Promise<User> {
    try {
      const userExists = await this.userModel
        .findOne({ username: user.username })
        .exec();
      if (userExists) {
        throw new ConflictException('Username already exists');
      }
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(user.password, salt);
      const newUser = new this.userModel({
        username: user.username,
        email: user.email,
        password: hashPass,
      });
      await newUser.save();
      return this.userModel.findById(newUser._id).select('-password').exec();
    } catch (err) {
      console.error('Error creating user:', err);
      if (err instanceof ConflictException) {
        // re throwing the  known exception
        throw err;
      }
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async update(id: string, User: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, User, { new: true });
  }

  async delete(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    await this.userModel.deleteOne({ _id: id });
    return user;
  }
}
