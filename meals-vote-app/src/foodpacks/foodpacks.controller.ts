import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
} from '@nestjs/common';
import { FoodpacksService } from './foodpacks.service';
import { CreateFoodpackDto } from './dto/create-foodpack.dto';
import { UpdateFoodpackDto } from './dto/update-foodpack.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { globalfileInterceptor } from 'src/common/globalfileInterceptor';

@Controller('foodpacks')
@ApiTags('Food Packs')
export class FoodpacksController {
  constructor(private readonly foodpacksService: FoodpacksService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a new Food Pack' })
  @ApiBody({
    description: 'Below data needed to create a new Food Pack',
    type: CreateFoodpackDto,
  })
  @globalfileInterceptor('image')
  create(
    @Body() createFoodpackDto: CreateFoodpackDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.foodpacksService.create(createFoodpackDto, file);
  }

  @Get()
  findAll() {
    return this.foodpacksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodpacksService.findOne(+id);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a new Food Pack' })
  @ApiBody({
    description: 'Below data needed to create a new Food Pack',
    type: UpdateFoodpackDto,
  })
  @globalfileInterceptor('image')
  update(
    @Param('id') id: number,
    @Body() updateFoodpackDto: UpdateFoodpackDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.foodpacksService.update(id, updateFoodpackDto, file);
  }
}
