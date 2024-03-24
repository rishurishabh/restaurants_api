import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Category } from '../schemas/restaurants.schema';

export class CreateRestaurantDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email address' })
  readonly email: string;

  @IsNotEmpty()
  @IsPhoneNumber('IN')
  readonly phoneNo: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsEnum(Category, { message: 'Please enter correct category' })
  readonly category: Category;
}
