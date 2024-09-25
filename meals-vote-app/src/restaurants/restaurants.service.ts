import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  create = async (body: CreateRestaurantDto) => {
    try {
      const newRestaurant = await this.prisma.restaurant.create({ data: body });
      if (newRestaurant) {
        return {
          success: true,
          message: 'Successfully create a new resturant',
          data: newRestaurant,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  };

  findAll = async () => {
    try {
      let allRestaurant = await this.prisma.restaurant.findMany({
        orderBy: {
          id: 'asc',
        },
      });
      return {
        success: true,
        message: 'All Restruants fetch successfully.',
        data: allRestaurant,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  };

  findOne = async (id: number) => {
    try {
      let getRestaurantById = await this.prisma.restaurant.findUnique({
        where: { id },
      });
      return {
        success: true,
        message: `${getRestaurantById.name} fetch successfully.`,
        data: getRestaurantById,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  };

  update = async (id: number, body: UpdateRestaurantDto) => {
    try {
      let updateRestaurant = await this.prisma.restaurant.update({
        where: { id },
        data: body,
      });
      if (!updateRestaurant) {
        return {
          success: false,
          message: 'Update Failed.',
        };
      }
      return {
        success: true,
        message: 'Update data successfully.',
        data: updateRestaurant,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  };
}
