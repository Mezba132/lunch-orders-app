import { Injectable } from '@nestjs/common';
import { CreateFoodpackDto } from './dto/create-foodpack.dto';
import { UpdateFoodpackDto } from './dto/update-foodpack.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FoodpacksService {
  constructor(private prisma: PrismaService) {}

  create = async (body: CreateFoodpackDto, file?: Express.Multer.File) => {
    try {
      let { items, ...rest } = body;
      const data = {
        ...rest,
        image: file !== undefined ? '/upload-files/' + file.filename : null,
      };

      const foodPack = await this.prisma.foodPack.create({ data });
      if (foodPack) {
        const itemsData: any = items.map((item: any) => ({
          ...item,
          foodPackId: foodPack.id,
        }));

        let newItems = await this.prisma.item.createMany({
          data: itemsData,
          skipDuplicates: true,
        });
        return {
          success: true,
          message: 'Successfully create a new Food Pack',
          data: foodPack,
          newItems,
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
      let allFoodPack = await this.prisma.foodPack.findMany({
        orderBy: {
          id: 'asc',
        },
        include: {
          restaurant: true,
          items: true,
        },
      });
      return {
        success: true,
        message: 'Successfully fetch all Food Pack',
        data: allFoodPack,
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
      let getFoodPackById = await this.prisma.foodPack.findUnique({
        where: { id },
      });
      return {
        success: true,
        message: `${getFoodPackById.name} fetch successfully.`,
        data: getFoodPackById,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  };

  update = async (
    id: number,
    updateFoodpackDto: UpdateFoodpackDto,
    file?: Express.Multer.File,
  ) => {
    try {
      let data = {
        ...updateFoodpackDto,
        image: file !== undefined ? '/upload-files/' + file.filename : null,
      };

      let updateFoodPack = await this.prisma.foodPack.update({
        where: { id },
        data,
      });
      if (!updateFoodPack) {
        return {
          success: false,
          message: 'Update Failed.',
        };
      }
      return {
        success: true,
        message: 'Update data successfully.',
        data: updateFoodPack,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  };
}
