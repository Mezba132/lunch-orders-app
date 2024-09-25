import { Injectable } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VotesService {
  constructor(private prisma: PrismaService) {}

  create = async (body: CreateVoteDto) => {
    try {
      let newVote = await this.prisma.vote.create({
        data: body,
      });
      return {
        success: true,
        message: 'New Vote created successfully',
        data: newVote,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  };

  findAll = async () => {
    try {
      let allVotes = await this.prisma.vote.findMany({
        orderBy: {
          id: 'asc',
        },
        include: {
          employee: true,
          foodPack: true,
        },
      });
      return {
        success: true,
        message: 'All Votes fetch successfully.',
        data: allVotes,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  };

  getDailyWinner = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
      const winner = await this.prisma.vote.groupBy({
        by: ['foodPackId'],
        where: {
          createdAt: {
            gte: today,
          },
        },
        _count: {
          foodPackId: true,
        },
        orderBy: {
          _count: {
            foodPackId: 'desc',
          },
        },
        take: 1,
      });

      if (winner.length > 0) {
        let data = await this.prisma.foodPack.findUnique({
          where: {
            id: winner[0].foodPackId,
          },
          include: {
            restaurant: true,
          },
        });
        return {
          success: true,
          message: 'Today Food Pack winner',
          data,
        };
      }

      return {
        success: false,
        message: 'No winner Found',
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  };
}
