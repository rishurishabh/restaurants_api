import {
  IsEmail,
  IsEmpty,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Category } from '../schemas/restaurants.schema';
import { User } from 'src/auth/schemas/user.schema';

export class UpdateRestaurantDto {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsEmail({}, { message: 'Please enter correct email address' })
  @IsOptional()
  readonly email: string;

  @IsPhoneNumber()
  @IsOptional()
  readonly phoneNo: string;

  @IsString()
  @IsOptional()
  readonly address: string;

  @IsEnum(Category, { message: 'Please enter correct category' })
  @IsOptional()
  readonly category: Category;

  @IsEmpty({ message: 'You can not provide user ID.' })
  readonly user: User;
}
