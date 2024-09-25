import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class ItemDto {
  @ApiProperty({
    example: 'Burger',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class CreateFoodpackDto {
  @ApiProperty({
    example: 'Combo 1',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 10,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  discount: number;

  @ApiProperty({
    type: [ItemDto],
    required: true,
    description: 'Array of items included in the food pack',
  })
  @IsNotEmpty()
  @Transform(({ value }) => JSON.parse(value))
  @Type(() => ItemDto)
  @Transform(({ value }) => {
    return typeof value === 'string' ? JSON.parse(value) : value;
  })
  items: ItemDto[];

  @ApiProperty({
    example: 2,
    required: true,
  })
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  restaurantId: number;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  image?: any;
}
