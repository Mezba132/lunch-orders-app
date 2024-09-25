import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  create = async (body: CreateItemDto) => {
    try {
      const newitem = await this.prisma.item.create({ data: body });
      if (newitem) {
        return {
          success: true,
          message: 'Successfully create a new item',
          data: newitem,
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
      let allitem = await this.prisma.item.findMany({
        orderBy: {
          id: 'asc',
        },
        include: {
          foodPack: true,
        },
      });
      return {
        success: true,
        message: 'All item fetch successfully.',
        data: allitem,
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
      let getitemById = await this.prisma.item.findUnique({
        where: { id },
        include: {
          foodPack: true,
        },
      });
      return {
        success: true,
        message: `${getitemById.name} fetch successfully.`,
        data: getitemById,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  };

  update = async (id: number, body: UpdateItemDto) => {
    try {
      let updateitem = await this.prisma.item.update({
        where: { id },
        data: body,
      });
      if (!updateitem) {
        return {
          success: false,
          message: 'Update Failed.',
        };
      }
      return {
        success: true,
        message: 'Update data successfully.',
        data: updateitem,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  };
}
