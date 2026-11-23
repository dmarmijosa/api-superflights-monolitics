import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from '../common/interfaces/user.interface';
import bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
  async create(userDto: UserDto): Promise<User> {
    const hashedPassword = await this.hashPassword(userDto.password);
    const newuser = new this.userModel({
      ...userDto,
      password: hashedPassword,
    });
    return await newuser.save();
  }
}
