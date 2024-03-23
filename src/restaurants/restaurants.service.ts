import { Injectable, NotFoundException } from '@nestjs/common';
import { Query } from 'express-serve-static-core';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './schemas/restaurants.schema';
import mongoose from 'mongoose';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: mongoose.Model<Restaurant>,
  ) {}

  //get all restaurants => GET /restaurants
  async findAll(query: Query): Promise<Restaurant[]> {
    const keywordFilter = query.keyword
      ? { name: { $regex: new RegExp(query.keyword.toString(), 'i') } }
      : {};
    const restaurants = await this.restaurantModel.find({ ...keywordFilter });
    return restaurants;
  }

  //create new restaurant => POST /restaurants
  async create(restaurant: Restaurant): Promise<Restaurant> {
    const res = await this.restaurantModel.create(restaurant);
    return res;
  }

  //get a restaurant by ID => GET /restaurants/:id
  async findById(id: string): Promise<Restaurant> {
    const res = await this.restaurantModel.findById(id);
    if (!res) {
      throw new NotFoundException('Restaurant not found.');
    }
    return res;
  }

  //update a restaurant by ID => PUT /restaurants/:id
  async updateById(id: string, restaurant: Restaurant): Promise<Restaurant> {
    return await this.restaurantModel.findByIdAndUpdate(id, restaurant, {
      new: true,
      runValidators: true,
    });
  }

  //delete a restaurant by ID => DELETE /restaurants/:id
  async deleteById(id: string): Promise<Restaurant> {
    return await this.restaurantModel.findByIdAndDelete(id);
  }
}
