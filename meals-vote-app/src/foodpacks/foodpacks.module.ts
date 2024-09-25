import { Module } from '@nestjs/common';
import { FoodpacksService } from './foodpacks.service';
import { FoodpacksController } from './foodpacks.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FoodpacksController],
  providers: [FoodpacksService],
})
export class FoodpacksModule {}
