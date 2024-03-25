import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './schemas/restaurants.schema';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/current-user.decorators';
import { User } from 'src/auth/schemas/user.schema';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantService: RestaurantsService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllRestaurants(
    @Query() query: ExpressQuery,
  ): Promise<Restaurant[]> {
    return this.restaurantService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createRestaurant(
    @Body() restaurant: CreateRestaurantDto,
    @CurrentUser() user: User,
  ): Promise<Restaurant> {
    return this.restaurantService.create(restaurant, user);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async getRestaurant(@Param('id') id: string): Promise<Restaurant> {
    return this.restaurantService.findById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async updateRestaurant(
    @Param('id') id: string,
    @Body() restaurant: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    await this.restaurantService.findById(id);
    return this.restaurantService.updateById(id, restaurant);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteRestaurant(
    @Param('id') id: string,
  ): Promise<{ deleted: Boolean }> {
    const restaurant = await this.restaurantService.findById(id);

    const isDeleted = await this.restaurantService.deleteImages(
      restaurant.images,
    );

    if (isDeleted) {
      const res = this.restaurantService.deleteById(id);
      if (res) {
        return {
          deleted: true,
        };
      }
    } else {
      return {
        deleted: false,
      };
    }
  }

  @Put('upload/:id')
  @UseGuards(AuthGuard())
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(
    @Param('id') id: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log(files);
    console.log(id);

    await this.restaurantService.findById(id);

    const res = await this.restaurantService.uploadImages(id, files);
    return res;
  }
}
